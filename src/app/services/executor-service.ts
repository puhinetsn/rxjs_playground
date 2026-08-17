import { computed, effect, Injectable, signal } from '@angular/core';
import { ObservableExecutor, SubscExecState } from '../engine/execution/execution';
import { PipelineSubscription } from '../engine/models/subscribtion.model';
import { Operator } from '../engine/models/operator.model';

@Injectable({
  providedIn: 'root',
})
export class ExecutorService {
  subscriptions = signal<PipelineSubscription[]>([
    {
      id: crypto.randomUUID(),
      name: `sub1$`,
      operators: [],
    },
  ]);
  public subscriptionsStates = signal<Record<string, SubscExecState>>({});
  subscIndex = signal<number>(1);
  emitDisabled = signal<boolean>(false);
  nextStepDisabled = signal<boolean>(true);
  runAllDisabled = signal<boolean>(true);
  resetDisabled = signal<boolean>(true);

  observableExecutor = computed(() => new ObservableExecutor(this.subscriptions()));

  constructor() {
    effect(() => {
      const subscription = this.observableExecutor().changedValue.subscribe((value) => {
        this.subscriptionsStates.set(value);
      });
      return () => subscription.unsubscribe();
    });
  }

  addNewSubscriber() {
    this.subscriptions.update((subs) => [
      ...subs,
      {
        id: crypto.randomUUID(),
        name: `sub${this.subscIndex() + 1}$`,
        operators: [],
      },
    ]);

    this.subscIndex.update((subscIndex) => subscIndex + 1);
  }

  deleteSuscription(elIndex: number) {
    this.subscriptions.update((subscriptions) =>
      subscriptions.filter((_, index) => index != elIndex),
    );
  }

  removeOperator(operatorIndex: number, subscIndex: number) {
    this.subscriptions.update((subscriptions) =>
      subscriptions.map((subsc, i) =>
        i === subscIndex
          ? { ...subsc, operators: subsc.operators.filter((_, oi) => oi !== operatorIndex) }
          : subsc,
      ),
    );
  }

  addNewOperator(operator: Operator, subscIndex: number) {
    this.subscriptions.update((subscriptions) =>
      subscriptions.map((subsc, i) =>
        i === subscIndex ? { ...subsc, operators: [...subsc.operators, operator] } : subsc,
      ),
    );
  }

  emitObservableValues(values: number[]) {
    this.emitDisabled.set(true);
    this.nextStepDisabled.set(false);
    this.runAllDisabled.set(false);
    this.resetDisabled.set(false);
    this.observableExecutor().emitValues(values);
  }

  emitNextStep() {
    this.observableExecutor().triggerNextStep();
  }

  emitRunAll() {
    this.observableExecutor().executeAllSteps();
    this.resetToDefault();
  }

  emitReset() {
    this.resetToDefault();
    this.observableExecutor().resetSubscriptions();
  }

  resetToDefault() {
    this.emitDisabled.set(false);
    this.nextStepDisabled.set(true);
    this.runAllDisabled.set(true);
    this.resetDisabled.set(true);
  }
}
