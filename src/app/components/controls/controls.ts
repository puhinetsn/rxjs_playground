import { Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ExecutorService } from '../../services/executor-service';

@Component({
  selector: 'app-controls',
  imports: [MatIconModule],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  emitNextValue = output<void>();
  executorService = inject(ExecutorService);

  emitValue() {
    this.emitNextValue.emit();
  }

  emitStep() {
    this.executorService.emitNextStep();
  }

  runAll() {
    this.executorService.emitRunAll();
  }

  reset() {
    this.executorService.emitReset();
  }
}
