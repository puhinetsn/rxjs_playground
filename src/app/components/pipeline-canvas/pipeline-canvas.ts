import { Component, computed, inject, input, signal } from '@angular/core';
import { AddSubscriber } from './components/add-subscriber/add-subscriber';
import { Subscription } from './components/subscription/subscription';
import { JsonPipe } from '@angular/common';
import { Operator } from '../../engine/models/operator.model';
import { ExecutorService } from '../../services/executor-service';

@Component({
  selector: 'app-pipeline-canvas',
  imports: [AddSubscriber, Subscription, JsonPipe],
  templateUrl: './pipeline-canvas.html',
  styleUrl: './pipeline-canvas.scss',
})
export class PipelineCanvas {
  executorService = inject(ExecutorService);

  observableExecutor = this.executorService.observableExecutor;
  subscriptions = this.executorService.subscriptions;

  observableValues = input<number[]>();

  addNewSubscriber() {
    this.executorService.addNewSubscriber();
  }

  deleteSuscription(elIndex: number) {
    this.executorService.deleteSuscription(elIndex);
  }

  removeOperator(operatorIndex: number, subscIndex: number) {
    this.executorService.removeOperator(operatorIndex, subscIndex);
  }

  addNewOperator(operator: Operator, subscIndex: number) {
    this.executorService.addNewOperator(operator, subscIndex);
  }
}
