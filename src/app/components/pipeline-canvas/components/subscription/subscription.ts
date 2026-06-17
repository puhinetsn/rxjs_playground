import { Component, input, output } from '@angular/core';
import { PipelineSubscription } from '../../../../engine/models/subscribtion.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subscription',
  imports: [MatIconModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription {
  subscription = input.required<PipelineSubscription>();
  deleteEl = output();

  deleteSubsc() {
    this.deleteEl.emit();
  }
}
