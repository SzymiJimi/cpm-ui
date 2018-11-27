import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'reservation-list-dialog',
  templateUrl: 'reservation-list-dialog.component.html',
})
export class ReservationListDialogComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    console.log(this.data);
  }
}
