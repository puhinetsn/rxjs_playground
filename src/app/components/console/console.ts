import { Component, inject } from '@angular/core';
import { ExecutorService } from '../../services/executor-service';

@Component({
  selector: 'app-console',
  imports: [],
  templateUrl: './console.html',
  styleUrl: './console.scss',
})
export class Console {
  executorService = inject(ExecutorService);
}
