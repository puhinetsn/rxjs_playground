import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { PipelineCanvas } from './components/pipeline-canvas/pipeline-canvas';
import { InputValues } from './components/input-values/input-values';
import { Controls } from './components/controls/controls';
import { Console } from './components/console/console';

@Component({
  selector: 'app-root',
  imports: [Header, PipelineCanvas, InputValues, Controls, Console],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('rxjs_playground');
}
