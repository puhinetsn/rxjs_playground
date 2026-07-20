import { computed, Injectable, signal } from '@angular/core';
import { ObservableExecutor } from '../engine/execution/execution';
import { PipelineSubscription } from '../engine/models/subscribtion.model';
import { Operator } from '../engine/models/operator.model';

@Injectable({
  providedIn: 'root',
})
export class ExecutorService {
  subscriptions = signal<PipelineSubscription[]>([
    {
      name: `sub1$`,
      operators: [],
    },
  ]);
  subscIndex = signal<number>(1);

  observableExecutor = computed(() => new ObservableExecutor(this.subscriptions()));

  addNewSubscriber() {
    this.subscriptions.update((subs) => [
      ...subs,
      {
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
}
