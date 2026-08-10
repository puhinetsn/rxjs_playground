import { Component, inject, signal } from '@angular/core';
import { Header } from './components/header/header';
import { PipelineCanvas } from './components/pipeline-canvas/pipeline-canvas';
import { InputValues } from './components/input-values/input-values';
import { Controls } from './components/controls/controls';
import { Console } from './components/console/console';
import { ExecutorService } from './services/executor-service';

@Component({
  selector: 'app-root',
  imports: [Header, PipelineCanvas, InputValues, Controls, Console],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('rxjs_playground');
  inputValues = signal<number[]>([3, 7, 1, 9, 4, 6]);
  executorService = inject(ExecutorService);

  emitValues() {
    this.executorService.emitObservableValues(this.inputValues());
  }
}
