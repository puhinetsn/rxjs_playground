import { Component, computed, inject, input, output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ValueOptions } from './components/value-options/value-options';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComparisonOptions } from './components/comparison-options/comparison-options';
import { AccumulatorOptions } from './components/accumulator-options/accumulator-options';
import { HigherOrderOptions } from './components/higher-order-options/higher-order-options';

import { MatDialogRef } from '@angular/material/dialog';
import { OperatorInfo } from '../../../../../../../data/operators';
import {
  OPERATOR_DEFAULTS,
  OPERATORS_WITH_ACCUMULATOR_OPTIONS,
  OPERATORS_WITH_COMPARISON_OPTIONS,
  OPERATORS_WITH_HIGHER_ORDER_OPTIONS,
  OPERATORS_WITH_NOTIFIER_OPTIONS,
  OPERATORS_WITH_VALUE_OPTIONS,
} from '../../../../../../../data/default-values';
import { OperatorOptions } from '../../../../../../../engine/models/operator.model';

@Component({
  selector: 'app-operator-options',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ValueOptions,
    MatButtonModule,
    ComparisonOptions,
    AccumulatorOptions,
    HigherOrderOptions,
  ],
  templateUrl: './operator-options.html',
  styleUrl: './operator-options.scss',
})
export class OperatorOptionsModal {
  data = input.required<OperatorInfo>();
  operatorDefaultValues = computed(() => OPERATOR_DEFAULTS[this.data().name]);
  form = new FormGroup<OperatorOptions>({});
  operatorCustomData = output<OperatorOptions>();
  dialogRef = inject(MatDialogRef);

  dataValueOptions = computed(() => OPERATORS_WITH_VALUE_OPTIONS.includes(this.data().name));

  dataComparisonOptions = computed(() =>
    OPERATORS_WITH_COMPARISON_OPTIONS.includes(this.data().name),
  );

  dataAccumulatorOptions = computed(() =>
    OPERATORS_WITH_ACCUMULATOR_OPTIONS.includes(this.data().name),
  );

  dataHigherOrderOptions = computed(() =>
    OPERATORS_WITH_HIGHER_ORDER_OPTIONS.includes(this.data().name),
  );

  dataNotifierOptions = computed(() => OPERATORS_WITH_NOTIFIER_OPTIONS.includes(this.data().name));

  submitPipe() {
    this.operatorCustomData.emit(this.form.value);
    this.dialogRef.close();
  }
}
