import { Component, computed, inject, input, output, signal } from '@angular/core';
import { PipelineSubscription } from '../../../../engine/models/subscribtion.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddOperatorModal } from '../modals/add-operator-modal/add-operator-modal';
import { Operator } from '../../../../engine/models/operator.model';
import { PipeOperator } from './components/pipe-operator/pipe-operator';
import { ExecutorService } from '../../../../services/executor-service';

@Component({
  selector: 'app-subscription',
  imports: [MatIconModule, PipeOperator],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription {
  dialog = inject(MatDialog);
  executorService = inject(ExecutorService);
  subscription = input.required<PipelineSubscription>();
  deleteSubscEvent = output();
  addNewOperatorEvent = output<Operator>();
  removeOperatorEvent = output<number>();
  executionState = computed(() => {
    return this.subscription().id in this.executorService.subscriptionsStates()
      ? this.executorService.subscriptionsStates()[this.subscription().id]
      : null;
  });

  openDialog() {
    const operatorDialog = this.dialog.open(AddOperatorModal);

    operatorDialog.afterClosed().subscribe((operator: Operator) => {
      if (operator) this.addNewOperatorEvent.emit(operator);
    });
  }

  deleteSubsc() {
    this.deleteSubscEvent.emit();
  }

  removeOperator(index: number) {
    this.removeOperatorEvent.emit(index);
  }
}
