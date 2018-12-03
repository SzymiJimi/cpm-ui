import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Observable, Subject} from 'rxjs';
import {ActionsService} from '../actions.service';
import {ItemModel} from '../../shared/models/item.model';
import {CalendarEvent} from 'angular-calendar';
import {ItemsService} from '../../items/items.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionModel} from '../../shared/models/reservation.model';
import {ConfirmDialog} from '../../shared/dialogs/confirm-dialog';
import {MatDialog} from '@angular/material';
declare var require: any;



@Component({
  selector: 'app-request-details',
  templateUrl: './action-details.component.html',
  styleUrls: ['./action-details.component.scss']
})
export class ActionDetailsComponent implements OnInit {
  available = false;
  src = require('../../shared/images/item.jpg');

  id: number;
  item: ItemModel;
  dataLoaded = false;
  private sub: any;
  reservation: ActionModel;
  finished = false;
  title: string;
  type: string;


  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private itemService: ItemsService,
              private routerNav: Router,
              private userService: UserService,
              private reservationService: ActionsService,
              private dialog: MatDialog) {
  }


  ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = +params['id'];
      this.reservationService.getSingleAction(this.id).subscribe((reservation)=>{
        this.reservation = reservation;
        this.setTitle();
        this.checkFinished();
        this.getItemFromDb(reservation.itemId.idItem);
      },(error)=>{

      });
    });
  }

  private getItemFromDb(id: number) {
    this.itemService.getSingleItem(id).subscribe((item) => {
      this.item = item;
      console.log(this.item);

      this.dataLoaded = true;
    });
  }

  private setTitle(){
    if(this.reservation.type==='RESERVATION'){
      this.title= 'Reservation';
      this.type= 'reservation';
    }else{
      this.title= 'Check-out';
      this.type= 'check-out';
    }
  }

  showItemDetails(){
      this.router.navigateByUrl("item/"+this.item.idItem);
  }

  checkFinished(){
    let now = new Date();
    console.log('Czas z bazy:' + new Date(this.reservation.to).getTime());
    console.log('Czas z teraz:' +(new Date().getTime()+ 3600000));
    this.finished = new Date(this.reservation.to).getTime() < new Date().getTime()+3600000;
  }

  finishReservation(){

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: {message: 'Are you sure you want finish reservation?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result ===true ){
        this.reservationService.finishAction(this.reservation).subscribe((value)=>{
          this.reservation = value;
          this.finished = true;
        }, (error)=>{

        })
      }
    });


  }


}
