import { PipelineSubscription } from '../models/subscribtion.model';

export class ObservableExecutor {
  constructor(private subscriptions: PipelineSubscription[]) {
    console.log(this.subscriptions);
  }
}
