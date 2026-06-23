import { Component, computed, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { OperatorTypes } from '../../../../../../../../../engine/models/operator.model';
import { OperatorInfo, OPERATORS_BY_TYPE } from '../../../../../../../../../data/operators';

@Component({
  selector: 'app-list-item',
  imports: [NgClass],
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
})
export class ListItem {
  dialog = inject(MatDialog);
  operatorsType = input.required<OperatorTypes>();
  operatorsList = computed(() => OPERATORS_BY_TYPE[this.operatorsType()]);
  operatorData = output<OperatorInfo>();

  selectOperator(operator: OperatorInfo) {
    this.operatorData.emit(operator);
  }
}
