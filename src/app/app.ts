import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { PipelineCanvas } from './components/pipeline-canvas/pipeline-canvas';

@Component({
  selector: 'app-root',
  imports: [Header, PipelineCanvas],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('rxjs_playground');
}
