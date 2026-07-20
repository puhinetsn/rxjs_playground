import { Observable, OperatorFunction, Subscriber } from 'rxjs';
import { PipelineSubscription } from '../models/subscribtion.model';
import { parsePipeOperator } from '../pipes/add-pipe-operator';

export class ObservableExecutor {
  private observableObject: Observable<number>;
  private observer!: Subscriber<number>;

  constructor(private subscriptions: PipelineSubscription[]) {
    this.observableObject = new Observable<number>((observer) => {
      this.observer = observer;
    });
    for (const subscription of subscriptions) {
      this.operatorItemToPipe(subscription);
    }
  }

  operatorItemToPipe(subscription: PipelineSubscription) {
    let pipeline: Observable<number> = this.observableObject;
    const pipesChain: OperatorFunction<number, number>[] = [];
    for (const operator of subscription.operators) {
      const newPipe = parsePipeOperator(operator);
      pipesChain.push(newPipe);
    }
    pipeline = this.observableObject.pipe(...(pipesChain as []));

    pipeline.subscribe((val) => console.log('Value:', val));
    this.observer.next(3);
    this.observer.complete();
  }

  // customTapOperator()
}
