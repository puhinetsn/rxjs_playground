import { Component, inject, input, output } from '@angular/core';
import { PipelineSubscription } from '../../../../engine/models/subscribtion.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddOperatorModal } from '../add-operator-modal/add-operator-modal';

@Component({
  selector: 'app-subscription',
  imports: [MatIconModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription {
  subscription = input.required<PipelineSubscription>();
  deleteEl = output();
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddOperatorModal);
  }

  deleteSubsc() {
    this.deleteEl.emit();
  }
}
