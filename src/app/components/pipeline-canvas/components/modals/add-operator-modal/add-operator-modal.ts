import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OperatorInfo } from '../../../../../data/operators';
import { OperatorOptionsModal } from './components/operator-options/operator-options';
import { OperatorsList } from './components/operators-list/operators-list';

@Component({
  selector: 'app-add-operator-modal',
  imports: [OperatorsList, MatButtonModule, MatDialogModule, OperatorOptionsModal],
  templateUrl: './add-operator-modal.html',
  styleUrl: './add-operator-modal.scss',
})
export class AddOperatorModal {
  operator = signal<OperatorInfo | undefined>(undefined);

  setOperator(operatorInfo: OperatorInfo) {
    this.operator.set(operatorInfo);
  }
}
