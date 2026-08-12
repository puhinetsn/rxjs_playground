import { Component, input, output } from '@angular/core';
import { Operator } from '../../../../../../engine/models/operator.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EmittedValue } from '../../../../../../engine/execution/execution';

@Component({
  selector: 'app-pipe-operator',
  imports: [CommonModule, MatIconModule],
  templateUrl: './pipe-operator.html',
  styleUrl: './pipe-operator.scss',
})
export class PipeOperator {
  pipe = input.required<Operator>();
  currentValue = input.required<EmittedValue[]>();
  highlightedValue = input.required<string | null>();
  removePipeOperator = output();

  removePipe() {
    this.removePipeOperator.emit();
  }
}
