import { BehaviorSubject, delay, Observable, OperatorFunction, Subject, tap } from 'rxjs';
import { PipelineSubscription } from '../models/subscribtion.model';
import { parsePipeOperator } from '../pipes/add-pipe-operator';

export interface SubscExecState {
  subscId: string;
  sourceValues: EmittedValue[];
  pipesValues: Record<string, EmittedValue[]>;
  output: EmittedValue[];
  highlightedValue: string | null;
}

export interface EmittedValue {
  id: string;
  value: number;
}

export class ObservableExecutor {
  private subject = new Subject<EmittedValue>();
  public changedValue: BehaviorSubject<Record<string, SubscExecState>>;
  private subscriptionsStates: Record<string, SubscExecState> = {};

  constructor(subscriptions: PipelineSubscription[]) {
    for (const subscription of subscriptions) {
      this.operatorItemToPipe(subscription);
    }

    this.changedValue = new BehaviorSubject<Record<string, SubscExecState>>(
      this.subscriptionsStates,
    );
  }

  private operatorItemToPipe(subscription: PipelineSubscription) {
    this.subscriptionsStates[subscription.id] = {
      subscId: subscription.id,
      sourceValues: [],
      pipesValues: {},
      output: [],
      highlightedValue: null,
    };

    let pipeline: Observable<EmittedValue> = this.subject;
    const pipesChain: OperatorFunction<EmittedValue, EmittedValue>[] = [];

    pipesChain.push(
      tap((val) => {
        this.subscriptionsStates[subscription.id].sourceValues.push(val);
        this.subscriptionsStates[subscription.id].highlightedValue = val.id;
        this.emitUpdatedState();
      }),
      delay(2000),
      tap((val) => {
        this.subscriptionsStates[subscription.id].sourceValues = this.subscriptionsStates[
          subscription.id
        ].sourceValues.filter((value) => value.id !== val.id);
        this.subscriptionsStates[subscription.id].highlightedValue = val.id;
        this.emitUpdatedState();
      }),
    );

    for (const operator of subscription.operators) {
      const newPipe = parsePipeOperator(operator);

      this.subscriptionsStates[subscription.id].pipesValues[operator.id] = [];

      pipesChain.push(delay(1300));

      pipesChain.push(newPipe);

      pipesChain.push(
        tap((val) => {
          const values = this.subscriptionsStates[subscription.id].pipesValues[operator.id];
          this.subscriptionsStates[subscription.id].pipesValues[operator.id] = [...values, val];
          this.subscriptionsStates[subscription.id].highlightedValue = val.id;
          this.emitUpdatedState();
        }),
        delay(1300),
        tap((val) => {
          this.subscriptionsStates[subscription.id].pipesValues[operator.id] =
            this.subscriptionsStates[subscription.id].pipesValues[operator.id].filter(
              (value) => value.id !== val.id,
            );
          this.subscriptionsStates[subscription.id].highlightedValue = val.id;
          this.emitUpdatedState();
        }),
      );
    }
    pipesChain.push(delay(1300));
    pipeline = this.subject.pipe(...(pipesChain as []));

    pipeline.subscribe((val) => {
      const values = this.subscriptionsStates[subscription.id].output;
      this.subscriptionsStates[subscription.id].output = [...values, val];
      this.subscriptionsStates[subscription.id].highlightedValue = val.id;
      this.emitUpdatedState();
    });
  }

  emitValues(numbers: number[]) {
    const exec = async () => {
      for (const num of numbers) {
        this.subject.next({
          id: crypto.randomUUID(),
          value: num,
        });
        await new Promise<void>((res) => setTimeout(() => res(), 500));
      }
      this.subject.complete();
    };

    exec();
  }

  emitUpdatedState() {
    this.changedValue.next(structuredClone(this.subscriptionsStates));
  }
}
