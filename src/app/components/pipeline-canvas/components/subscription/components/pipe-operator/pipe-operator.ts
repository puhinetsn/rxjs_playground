import { Component, input, output } from '@angular/core';
import { Operator } from '../../../../../../engine/models/operator.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pipe-operator',
  imports: [CommonModule, MatIconModule],
  templateUrl: './pipe-operator.html',
  styleUrl: './pipe-operator.scss',
})
export class PipeOperator {
  pipe = input.required<Operator>();
  removePipeOperator = output();

  removePipe() {
    this.removePipeOperator.emit();
  }
}
