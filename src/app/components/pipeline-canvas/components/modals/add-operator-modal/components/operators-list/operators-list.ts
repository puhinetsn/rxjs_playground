import { Component, output, signal } from '@angular/core';
import { ListItem } from './components/list-item/list-item';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OperatorTypes } from '../../../../../../../engine/models/operator.model';
import { OperatorInfo } from '../../../../../../../data/operators';

@Component({
  selector: 'app-operators-list',
  imports: [ListItem, MatDialogModule, MatButtonModule],
  templateUrl: './operators-list.html',
  styleUrl: './operators-list.scss',
})
export class OperatorsList {
  operatorTypes = Object.values(OperatorTypes);
  operator = output<OperatorInfo>();

  setOperatorSelected(operatorInfo: OperatorInfo) {
    this.operator.emit(operatorInfo);
  }
}
