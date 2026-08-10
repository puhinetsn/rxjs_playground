import { Operator } from './operator.model';

export interface PipelineSubscription {
  id: string;
  name: string;
  operators: Operator[];
}
