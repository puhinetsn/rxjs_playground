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
import {
  ComparisonOperatorOptions,
  ComparisonOperators,
} from '../../../../../../../engine/models/operator.model';
import { OPERATOR_DEFAULTS } from '../../../../../../../data/default-values';

@Component({
  selector: 'app-comparison-options',
  imports: [FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './comparison-options.html',
  styleUrl: './comparison-options.scss',
})
export class ComparisonOptions implements OnInit {
  operatorName = input.required<OperatorName>();
  operatorDefaultValues = computed(
    () => OPERATOR_DEFAULTS[this.operatorName()] as ComparisonOperatorOptions,
  );

  form = input.required<FormGroup>();

  get valueControl(): FormControl {
    return this.form().get('value') as FormControl;
  }

  get operatorControl(): FormControl {
    return this.form().get('operator') as FormControl;
  }

  options = Object.values(ComparisonOperators);

  ngOnInit() {
    this.form().addControl(
      'value',
      new FormControl(this.operatorDefaultValues().value, [Validators.required]),
    );

    this.form().addControl(
      'operator',
      new FormControl(this.operatorDefaultValues().operator, [Validators.required]),
    );
  }
}
