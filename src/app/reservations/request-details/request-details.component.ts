import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Observable, Subject} from 'rxjs';
import {ReservationsService} from '../reservations.service';
import {ItemModel} from '../../shared/models/item.model';
import {CalendarEvent} from 'angular-calendar';
import {ItemsService} from '../../items/items.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionModel} from '../../shared/models/reservation.model';
declare var require: any;



@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  available = false;
  src = require('../../shared/images/item.jpg');

  id: number;
  item: ItemModel;
  dataLoaded = false;
  private sub: any;
  reservation: ActionModel;

  refresh: Subject<any> = new Subject();

  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private itemService: ItemsService,
              private routerNav: Router,
              private userService: UserService,
              private reservationService: ReservationsService) {
  }


  ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = +params['id'];
      this.reservationService.getSingleReservation(this.id).subscribe((reservation)=>{
        this.reservation = reservation;
        console.log(this.reservation);
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



  view: string = 'month';

  viewDate: Date = new Date();


  activeDayIsOpen: boolean = false;

  showItemDetails(){
      this.router.navigateByUrl("item/"+this.item.idItem);
  }

  events: Array<CalendarEvent<{ incrementsBadgeTotal: boolean }>> =[];




}
