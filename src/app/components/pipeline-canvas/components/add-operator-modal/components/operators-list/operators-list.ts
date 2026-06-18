import { Component, computed, input } from '@angular/core';
import { OperatorTypes } from '../../../../../../engine/models/operator.model';
import { OPERATORS_BY_TYPE } from '../../../../../../data/operators';

@Component({
  selector: 'app-operators-list',
  imports: [],
  templateUrl: './operators-list.html',
  styleUrl: './operators-list.scss',
})
export class OperatorsList {
  operatorsType = input.required<OperatorTypes>();
  operatorsList = computed(() => OPERATORS_BY_TYPE[this.operatorsType()]);
}
