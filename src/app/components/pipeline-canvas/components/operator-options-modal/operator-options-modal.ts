import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { OperatorInfo } from '../../../../data/operators';

@Component({
  selector: 'app-operator-options-modal',
  imports: [MatDialogModule],
  templateUrl: './operator-options-modal.html',
  styleUrl: './operator-options-modal.scss',
})
export class OperatorOptionsModal implements OnInit {
  data = inject<{ operatorData: OperatorInfo }>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log(this.data);
  }
}
