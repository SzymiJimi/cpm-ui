import { Component, OnInit } from '@angular/core';
import {ReservationsService} from '../reservations/reservations.service';
import {Observable, Subject} from 'rxjs';
import {isSameDay, isSameMonth} from 'date-fns';
import {ItemModel} from '../shared/models/item.model';
import {CalendarEvent} from 'angular-calendar';
import {DatetimePipe} from '../shared/pipes/datetime.pipe';
import {ItemsService} from '../items/items.service';
import {ReservationModel} from '../shared/models/reservation.model';
import {ActivatedRoute, Router} from '@angular/router';
import {colors} from '../items/demo-utils/colors';
import {UserModel} from '../shared/models/user.model';
import {UserService} from '../shared/services/user.service';

declare var require: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // available = false;
  name = 'Profile';
  src = require('../shared/images/profile.jpg');
  id: number;
  item: ItemModel;
  dataLoaded = true;
  private sub: any;
  user: UserModel;
  newUserRole;
  reservationsForItem: ReservationModel[];
  refresh: Subject<any> = new Subject();

  constructor(private router: ActivatedRoute,
              private userService: UserService,
              private itemService: ItemsService,
              private routerNav: Router,
              private reservationService: ReservationsService) {
    // this.tenDays.setDate(this.tenDays.getDay()+4);
  }


  ngOnInit() {
    this.userService.personData.subscribe(()=>{
      this.user = this.userService.user;
    })
  }

  // private getProfileFromDb() {
  //   this.itemService.getSingleItem(this.id).subscribe((item) => {
  //     this.item = item;
  //     this.checkAvailability();
  //     this.getReservationsForItem();
  //     this.dataLoaded = true;
  //   });
  // }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  changeUserRole(){
    this.newUserRole = this.user.idRole.name;
  }




}
