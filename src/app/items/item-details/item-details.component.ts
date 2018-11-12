import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from '../items.service';
import {ItemModel} from '../../shared/models/item.model';
import {
  CalendarEvent,
} from 'angular-calendar';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import {colors} from '../demo-utils/colors';
import {Observable, Subject} from 'rxjs';
import {ReservationModel} from '../../shared/models/reservation.model';
import {ReservationsService} from '../../reservations/reservations.service';
import {DatetimePipe} from '../../shared/pipes/datetime.pipe';
import {UserService} from '../../shared/services/user.service';

declare var require: any;

interface Film {
  id: number;
  title: string;
  release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
  return `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
}

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  available = false;
  name = 'HP';
  src = require('../../shared/images/item.jpg');
  id: number;
  item: ItemModel;
  dataLoaded = false;
  private sub: any;
  reservationsForItem: ReservationModel[];
  refresh: Subject<any> = new Subject();

  constructor(private router: ActivatedRoute,
              private itemService: ItemsService,
              private routerNav: Router,
              private userService: UserService,
              private reservationService: ReservationsService) {
    // this.tenDays.setDate(this.tenDays.getDay()+4);
  }


  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.id = +params['id'];
      this.getItemFromDb();

    });
  }

  private getItemFromDb() {
    this.itemService.getSingleItem(this.id).subscribe((item) => {
      this.item = item;
      this.checkAvailability();
      this.getReservationsForItem();
      this.dataLoaded = true;
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  view: string = 'month';

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<{ film: Film }>>>;

  activeDayIsOpen: boolean = false;


  events: Array<CalendarEvent<{ incrementsBadgeTotal: boolean }>> =[];

  dayClicked({
               date,
               events
             }: {
    date: Date;
    events: Array<CalendarEvent<{ film: Film }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ film: Film }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      '_blank'
    );
  }

  reserveItem(element: ItemModel) {
    this.itemService.itemToReserve = this.item;
    this.routerNav.navigateByUrl('reservation/new');
  }

  checkAvailability() {
    this.itemService.checkAvailabilityOfItem(this.item.idItem).subscribe((value) => {
        this.available = value;
      },
      (error) => {
        this.available = error;
      });
  }

  getReservationsForItem() {
    this.reservationService.getAllReservationsForItem(this.item.idItem).subscribe((value) => {
      this.reservationsForItem = value;
      this.insertReservationsToCalendar();
    });
  }

  private insertReservationsToCalendar() {
    let dateFrom: Date;
    let dateTo: Date;
    let amountOfDays: number;
    let color;
    this.reservationsForItem.forEach((reservation) => {
      dateFrom = new Date(reservation.from);
      dateTo = new Date(reservation.to);
      if(reservation.type === 'RESERVATION')
      {
        color = colors.yellow;
      }else{
        color = colors.red;
      }
      amountOfDays = this.calculateDaysBetween(dateFrom, dateTo);
      for (let i = 0; i < amountOfDays; i++) {
        let dateToInsert: Date = new Date(dateFrom);
        dateToInsert.setDate(dateToInsert.getDate() + i);
        this.events.push({
          title: reservation.reason +
                '<br/> &emsp;&emsp; From: ' +
                new DatetimePipe().transform(reservation.from.toString()) +
                '<br/> &emsp;&emsp; To: ' +
                new DatetimePipe().transform(reservation.to.toString()),
          color: color,
          start: dateToInsert,
          meta: {
            incrementsBadgeTotal: true
          }
        });
        this.refresh.next();
      }
    });
  }

  private calculateDaysBetween(from: Date, to: Date): number {
    let one_day = 1000 * 60 * 60 * 24;
    let fromLong = from.getTime();
    let toLong = to.getTime();
    return (toLong - fromLong) / one_day;
  }


}
