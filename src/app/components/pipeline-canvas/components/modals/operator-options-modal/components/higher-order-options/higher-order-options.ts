import { Component, computed, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OperatorName } from '../../../../../../../data/operators';
import { OPERATOR_DEFAULTS } from '../../../../../../../data/default-values';
import { HigherOrderMapOptions } from '../../../../../../../engine/models/operator.model';

@Component({
  selector: 'app-higher-order-options',
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './higher-order-options.html',
  styleUrl: './higher-order-options.scss',
})
export class HigherOrderOptions {
  operatorName = input.required<OperatorName>();
  operatorDefaultValues = computed(
    () => OPERATOR_DEFAULTS[this.operatorName()] as HigherOrderMapOptions,
  );

  form = input.required<FormGroup>();

  get innerCountControl(): FormControl {
    return this.form().get('innerCount') as FormControl;
  }

  get intervalMsControl(): FormControl {
    return this.form().get('intervalMs') as FormControl;
  }

  ngOnInit() {
    this.form().addControl(
      'innerCount',
      new FormControl(this.operatorDefaultValues().innerCount, [Validators.required]),
    );

    this.form().addControl(
      'intervalMs',
      new FormControl(this.operatorDefaultValues().intervalMs, [Validators.required]),
    );
  }
}
