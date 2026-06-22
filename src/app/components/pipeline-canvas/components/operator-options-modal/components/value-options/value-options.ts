import { Component, computed, input, OnInit } from '@angular/core';
import { OPERATOR_DEFAULTS } from '../../../../../../data/default-values';
import { OperatorName } from '../../../../../../data/operators';
import { ValueOperatorOptions } from '../../../../../../engine/models/operator.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      value: new FormControl(this.operatorDefaultValues().value, [Validators.required]),
    });
  }
}
