import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-value',
  imports: [MatIconModule],
  templateUrl: './input-value.html',
  styleUrl: './input-value.scss',
})
export class InputValue {
  value = input.required<number>();
  removedNumber = output();

  removeNumber() {
    this.removedNumber.emit();
  }
}
