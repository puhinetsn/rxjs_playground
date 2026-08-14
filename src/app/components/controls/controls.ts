import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-controls',
  imports: [MatIconModule],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class Controls {
  emitNextValue = output<void>();
  emitNextStep = output<void>();
  emitRunAll = output<void>();
  emitReset = output<void>();

  emitValue() {
    this.emitNextValue.emit();
  }

  emitStep() {
    this.emitNextStep.emit();
  }

  runAll() {
    this.emitRunAll.emit();
  }

  reset() {
    this.emitReset.emit();
  }
}
