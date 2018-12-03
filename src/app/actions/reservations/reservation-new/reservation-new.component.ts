import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../../items/items.service';
import {UserService} from '../../../shared/services/user.service';
import {ItemModel} from '../../../shared/models/item.model';
import {LocationService} from '../../../location/location.service';
import {ActionModel} from '../../../shared/models/reservation.model';
import {FormControl} from '@angular/forms';
import {ActionsService} from '../../actions.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ReservationListDialogComponent} from './reservations-dialog/reservation-list-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-new',
  templateUrl: './reservation-new.component.html',
  styleUrls: ['./reservation-new.component.scss']
})
export class ReservationNewComponent implements OnInit {

  itemChecked=false;
  reservingStarted= false;
  allReservationsForItem: ActionModel[];
  reservingItem: ItemModel;

  newReservation: ActionModel = new ActionModel();


  constructor( private locationService: LocationService,
               private router: Router,
               private user: UserService,
               private itemService: ItemsService,
               private reservationService: ActionsService,
               public dialog: MatDialog,
               public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  this.reservingItem = this.itemService.itemToReserve;
  this.itemChecked = true;
  if(this.reservingItem!==undefined){
    this.reservationService.getAllReservationsForItem(this.reservingItem.idItem).subscribe((value)=>{
        this.allReservationsForItem = value;
      },
      (error)=>{

      });
  }
  }



  reserveItem(){
    if(!this.checkDates()){
      this.newReservation.itemId = this.reservingItem;
      this.newReservation.reserverUser = this.user.user;
      this.reservationService.reserveItem(this.newReservation).subscribe(()=>
      {
        this.openSuccessSnackBar();
        this.itemService.itemToReserve = new ItemModel();
        this.router.navigateByUrl('/');
      },(error)=>{
        this.openErrorSnackBar();
      });

    }else{
      alert('Selected dates are not correct, check reservations for this item, and input them correctly!');
    }

  }

  openSuccessSnackBar() {
    this.snackBar.open('The reservation creation was completed successfully!' , 'Ok', {
      duration: 5000,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'end'
    });
  }

  openErrorSnackBar() {
    this.snackBar.open('Error with creating reservation!' , 'Ok', {
      duration: 15000,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'end'
    });
  }

  checkDates():boolean{
    let includes= false;
    this.allReservationsForItem.forEach((reservation)=>{
      if(this.compareDates(reservation)){ includes = true; }
    });
    return includes;
  }

  private compareDates(reservation: ActionModel): boolean{
    let value: boolean = false;
    if(this.checkInclude(new Date(this.newReservation.from), new Date(reservation.from), new Date(reservation.to))){ value = true; }
    if(this.checkInclude(new Date(this.newReservation.from), new Date(reservation.from), new Date(reservation.to))){ value = true; }
    if(this.checkInclude(new Date(this.newReservation.to), new Date( reservation.from), new Date(reservation.to))){ value = true; }
    if(this.checkInclude(new Date(reservation.from), new Date(this.newReservation.from), new Date(this.newReservation.to))){ value = true; }
    if(this.checkInclude(new Date(reservation.to), new Date(this.newReservation.from), new Date(this.newReservation.to))){ value = true; }
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
