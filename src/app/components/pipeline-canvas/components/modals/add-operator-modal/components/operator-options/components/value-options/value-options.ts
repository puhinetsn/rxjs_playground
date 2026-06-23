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
import { OperatorName } from '../../../../../../../../../data/operators';
import { OPERATOR_DEFAULTS } from '../../../../../../../../../data/default-values';
import { ValueOperatorOptions } from '../../../../../../../../../engine/models/operator.model';

@Component({
  selector: 'app-value-options',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './value-options.html',
  styleUrl: './value-options.scss',
})
export class ValueOptions implements OnInit {
  operatorName = input.required<OperatorName>();
  operatorDefaultValues = computed(
    () => OPERATOR_DEFAULTS[this.operatorName()] as ValueOperatorOptions,
  );

  form = input.required<FormGroup>();

  get valueControl(): FormControl {
    return this.form().get('value') as FormControl;
  }

  ngOnInit() {
    this.form().addControl(
      'value',
      new FormControl(this.operatorDefaultValues().value, [Validators.required]),
    );
  }
}
