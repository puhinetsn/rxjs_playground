import { Component, computed, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperatorOptionsModal } from '../../../operator-options-modal/operator-options-modal';
import { NgClass } from '@angular/common';
import { OperatorTypes } from '../../../../../../../engine/models/operator.model';
import { OperatorInfo, OPERATORS_BY_TYPE } from '../../../../../../../data/operators';

@Component({
  selector: 'app-operators-list',
  imports: [NgClass],
  templateUrl: './operators-list.html',
  styleUrl: './operators-list.scss',
})
export class OperatorsList {
  dialog = inject(MatDialog);
  operatorsType = input.required<OperatorTypes>();
  operatorsList = computed(() => OPERATORS_BY_TYPE[this.operatorsType()]);

  openDialog(operator: OperatorInfo) {
    this.dialog.closeAll();
    this.dialog.open(OperatorOptionsModal, {
      data: { operatorData: operator },
    });
  }
}
