import { Component, inject, input, output, signal } from '@angular/core';
import { PipelineSubscription } from '../../../../engine/models/subscribtion.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddOperatorModal } from '../modals/add-operator-modal/add-operator-modal';
import { Operator } from '../../../../engine/models/operator.model';
import { PipeOperator } from './components/pipe-operator/pipe-operator';

@Component({
  selector: 'app-subscription',
  imports: [MatIconModule, PipeOperator],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription {
  dialog = inject(MatDialog);
  subscription = input.required<PipelineSubscription>();
  deleteSubscEvent = output();
  addNewOperatorEvent = output<Operator>();
  removeOperatorEvent = output<number>();

  openDialog() {
    const operatorDialog = this.dialog.open(AddOperatorModal);

    operatorDialog.afterClosed().subscribe((operator: Operator) => {
      if (operator) {
        this.addNewOperatorEvent.emit(operator);
      }
    });
  }

  deleteSubsc() {
    this.deleteSubscEvent.emit();
  }

  removeOperator(index: number) {
    this.removeOperatorEvent.emit(index);
  }
}
