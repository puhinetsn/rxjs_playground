import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { PipelineCanvas } from './components/pipeline-canvas/pipeline-canvas';
import { InputValues } from './components/input-values/input-values';

@Component({
  selector: 'app-root',
  imports: [Header, PipelineCanvas, InputValues],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('rxjs_playground');
}
