import { Component, computed, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { OperatorInfo } from '../../../../data/operators';
import {
  OPERATOR_DEFAULTS,
  OPERATORS_WITH_ACCUMULATOR_OPTIONS,
  OPERATORS_WITH_COMPARISON_OPTIONS,
  OPERATORS_WITH_HIGHER_ORDER_OPTIONS,
  OPERATORS_WITH_NOTIFIER_OPTIONS,
  OPERATORS_WITH_VALUE_OPTIONS,
} from '../../../../data/default-values';
import { ValueOptions } from './components/value-options/value-options';

@Component({
  selector: 'app-operator-options-modal',
  imports: [MatDialogModule, ValueOptions],
  templateUrl: './operator-options-modal.html',
  styleUrl: './operator-options-modal.scss',
})
export class OperatorOptionsModal implements OnInit {
  data = inject<{ operatorData: OperatorInfo }>(MAT_DIALOG_DATA);
  operatorDefaultValues = computed(() => OPERATOR_DEFAULTS[this.data.operatorData.name]);

  dataValueOptions = computed(() =>
    OPERATORS_WITH_VALUE_OPTIONS.includes(this.data.operatorData.name),
  );

  dataComparisonOptions = computed(() =>
    OPERATORS_WITH_COMPARISON_OPTIONS.includes(this.data.operatorData.name),
  );

  dataAccumulatorOptions = computed(() =>
    OPERATORS_WITH_ACCUMULATOR_OPTIONS.includes(this.data.operatorData.name),
  );

  dataHigherOrderOptions = computed(() =>
    OPERATORS_WITH_HIGHER_ORDER_OPTIONS.includes(this.data.operatorData.name),
  );

  dataNotifierOptions = computed(() =>
    OPERATORS_WITH_NOTIFIER_OPTIONS.includes(this.data.operatorData.name),
  );

  ngOnInit(): void {
    console.log(this.operatorDefaultValues());
  }
}
