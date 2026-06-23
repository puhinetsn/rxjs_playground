import { Component } from '@angular/core';
import { OperatorsList } from './components/operators-list/operators-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OperatorTypes } from '../../../../../engine/models/operator.model';

@Component({
  selector: 'app-add-operator-modal',
  imports: [OperatorsList, MatButtonModule, MatDialogModule],
  templateUrl: './add-operator-modal.html',
  styleUrl: './add-operator-modal.scss',
})
export class AddOperatorModal {
  operatorTypes = Object.values(OperatorTypes);
}
