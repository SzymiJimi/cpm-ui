import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ConfirmDialogData} from '../interfaces/confirm-dialog-data.interface';

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog{

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}


}
