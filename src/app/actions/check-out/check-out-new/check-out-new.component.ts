import { Component, OnInit } from '@angular/core';
import {ActionModel} from '../../../shared/models/reservation.model';
import {MatDialog} from '@angular/material';
import {ItemModel} from '../../../shared/models/item.model';
import {LocationService} from '../../../location/location.service';
import {ItemsService} from '../../../items/items.service';
import {UserService} from '../../../shared/services/user.service';
import {FormControl} from '@angular/forms';
import {ReservationListDialogComponent} from '../../reservations/reservation-new/reservations-dialog/reservation-list-dialog.component';
import {ActionsService} from '../../actions.service';
import {CheckOutService} from '../check-out.service';

@Component({
  selector: 'app-check-out-new',
  templateUrl: './check-out-new.component.html',
  styleUrls: ['./check-out-new.component.scss']
})
export class CheckOutNewComponent implements OnInit {

  itemChecked=false;
  checkOutStarted= false;
  allReservationsForItem: ActionModel[];
  myControl = new FormControl();
  checkOutingItem: ItemModel;

  newCheckOut: ActionModel = new ActionModel();


  constructor( private locationService: LocationService,
               private user: UserService,
               private itemService: ItemsService,
               private reservationService: ActionsService,
               private checkOutService: CheckOutService,
               public dialog: MatDialog) {
  }

  ngOnInit() {
    this.checkOutingItem = this.itemService.itemToCheckout;
    this.itemChecked = true;
    if(this.checkOutingItem!==undefined){
      this.reservationService.getAllReservationsForItem(this.checkOutingItem.idItem).subscribe((value)=>{
          this.allReservationsForItem = value;
        },
        (error)=>{

        });
    }
  }



  checkoutItem(){
    if(!this.checkDates()){
      this.newCheckOut.from = new Date();
      this.newCheckOut.itemId = this.checkOutingItem;
      this.newCheckOut.reserverUser = this.user.user;
      this.checkOutService.checkOutItem(this.newCheckOut);
    }else{
      alert('Selected dates are not correct, check reservations for this item, and input them correctly!');
    }

  }

  checkDates():boolean{
    let includes= false;
    this.allReservationsForItem.forEach((reservation)=>{
      if(this.compareDates(reservation)){ includes = true; }
      console.log('sprawdzanie trwa');
    });
    return includes;
  }

  private compareDates(reservation: ActionModel): boolean{
    let value: boolean = false;
    if(this.checkInclude(new Date(this.newCheckOut.from), new Date(reservation.from), new Date(reservation.to))){ value = true; }
    if(this.checkInclude(new Date(this.newCheckOut.from), new Date(reservation.from), new Date(reservation.to))){ value = true; }
    if(this.checkInclude(new Date(this.newCheckOut.to), new Date( reservation.from), new Date(reservation.to))){ value = true; }
    if(this.checkInclude(new Date(reservation.from), new Date(this.newCheckOut.from), new Date(this.newCheckOut.to))){ value = true; }
    if(this.checkInclude(new Date(reservation.to), new Date(this.newCheckOut.from), new Date(this.newCheckOut.to))){ value = true; }
    return value;
  }

  private checkInclude(date: Date, fromOld: Date, toOld: Date): boolean{
    if(date.getTime()>=fromOld.getTime() && date.getTime() <= toOld.getTime()){
      return true;
    }else{
      return false;
    }
  }

  openReservationListDialog(){
    this.dialog.open(ReservationListDialogComponent, {
      data: {
        reservations: this.allReservationsForItem
      }
    });
  }
}
