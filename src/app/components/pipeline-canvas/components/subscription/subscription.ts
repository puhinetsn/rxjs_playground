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
  subscription = input.required<PipelineSubscription>();
  deleteEl = output();
  dialog = inject(MatDialog);
  subscriptionPipes = signal<Operator[]>([]);

  openDialog() {
    const operatorDialog = this.dialog.open(AddOperatorModal);

    operatorDialog.afterClosed().subscribe((operator: Operator) => {
      if (operator) {
        this.subscriptionPipes.update((ops) => [...ops, operator]);
      }
    });
  }

  deleteSubsc() {
    this.deleteEl.emit();
  }

  removeOperator(index: number) {
    this.subscriptionPipes.update(() => this.subscriptionPipes().filter((_, i) => i !== index));
  }
}
