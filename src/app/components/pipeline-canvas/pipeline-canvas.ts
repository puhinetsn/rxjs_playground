import { Component, signal } from '@angular/core';
import { AddSubscriber } from './components/add-subscriber/add-subscriber';
import { PipelineSubscription } from '../../engine/models/subscribtion.model';
import { Subscription } from './components/subscription/subscription';

@Component({
  selector: 'app-pipeline-canvas',
  imports: [AddSubscriber, Subscription],
  templateUrl: './pipeline-canvas.html',
  styleUrl: './pipeline-canvas.scss',
})
export class PipelineCanvas {
  subscriptions = signal<PipelineSubscription[]>([
    {
      name: `sub1$`,
      operators: [],
    },
  ]);
  subscIndex = signal<number>(1);

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
}
