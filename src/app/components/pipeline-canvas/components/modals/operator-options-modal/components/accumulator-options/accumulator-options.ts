import { Component, computed, input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OperatorName } from '../../../../../../../data/operators';
import { OPERATOR_DEFAULTS } from '../../../../../../../data/default-values';
import {
  AccumulatorOperatorOptions,
  NumericOperators,
} from '../../../../../../../engine/models/operator.model';

@Component({
  selector: 'app-accumulator-options',
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './accumulator-options.html',
  styleUrl: './accumulator-options.scss',
})
export class AccumulatorOptions implements OnInit {
  operatorName = input.required<OperatorName>();
  operatorDefaultValues = computed(
    () => OPERATOR_DEFAULTS[this.operatorName()] as AccumulatorOperatorOptions,
  );

  form = input.required<FormGroup>();

  options = Object.values(NumericOperators);

  get seedControl(): FormControl {
    return this.form().get('seed') as FormControl;
  }

  get operatorControl(): FormControl {
    return this.form().get('operator') as FormControl;
  }

  ngOnInit() {
    this.form().addControl(
      'seed',
      new FormControl(this.operatorDefaultValues().seed, [Validators.required]),
    );

    this.form().addControl(
      'operator',
      new FormControl(this.operatorDefaultValues().operator, [Validators.required]),
    );
  }
}
