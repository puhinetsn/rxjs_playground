import { Operator } from "./operator.model";

export interface PipelineSubscription {
  name:         string;
  operators:    Operator[];
}
