import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputValue } from './input-value/input-value';
import { JsonPipe } from '@angular/common';
import { NeverErrorStateMatcher } from '../../utils/error-state-matcher.util';

@Component({
  selector: 'app-input-values',
  imports: [
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    InputValue,
    JsonPipe,
  ],
  templateUrl: './input-values.html',
  styleUrl: './input-values.scss',
})
export class InputValues {
  valueForm = new FormGroup({
    value: new FormControl('', [Validators.required]),
  });
  matcher = new NeverErrorStateMatcher();

  inputValues = signal<number[]>([3, 7, 1, 9, 4, 6]);

  removeNumber(numberIndex: number) {
    this.inputValues.update(() => this.inputValues().filter((_, index) => index != numberIndex));
  }

  onSubmit() {
    if (this.valueForm.invalid) return;

    this.inputValues.update((values) => [...values, +this.valueForm.value.value!]);
    this.valueForm.reset();
  }
}
