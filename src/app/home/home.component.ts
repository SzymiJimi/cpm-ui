import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {AppService} from '../shared/services/app.service';
import {Subscriber, Subscription} from 'rxjs';
import {UserModel} from '../shared/models/user.model';
import {ActionsService} from '../actions/actions.service';
import {ActionModel} from '../shared/models/reservation.model';
import {MatTableDataSource} from '@angular/material';
import {Router, RouterModule} from '@angular/router';
import {CheckOutService} from '../actions/check-out/check-out.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  ordersPrevLoaded = false;
  ordersActiveLoaded = false;
  dateToShow;
  activeReservations;
  prevReservations;
  dataSourceActiveOrders: MatTableDataSource<ActionModel>;
  displayedActiveColumns: string[] = [ 'name', 'to'];

  activeCheckout;
  prevCheckout;
  checkoutPrevLoaded = false;
  checkoutActiveLoaded = false;
  dataSourceActiveCheckout: MatTableDataSource<ActionModel>;



  constructor(private app: AppService,
              private actionService: ActionsService,
              private checkout: CheckOutService,
              private router: Router) {
  }

  ngOnInit() {
    if(this.app.authenticated ===true){
      this.getActiveReservations();
      this.getPrevReservations();
      this.getActiveCheckout();
      this.getPrevCheckout();
    }else {
      this.app.authenticatedSubject.subscribe((value) => {
        this.getActiveReservations();
        this.getPrevReservations();
        this.getActiveCheckout();
        this.getPrevCheckout();
      });
    }

    let date = new Date();
    this.dateToShow = "  "+date.getDate()+" / "+(date.getMonth()+1)+" / "+date.getFullYear();
  }

  getActiveReservations(){
    this.actionService.getAllActiveUserReservations().subscribe((reservations)=>{
      this.activeReservations = reservations;
      this.dataSourceActiveOrders =  new MatTableDataSource<ActionModel>(reservations);
      this.ordersActiveLoaded = true;
    }, (error)=>{
      this.ordersActiveLoaded = true;
    })
  }

  getPrevReservations(){
    this.actionService.getAllPreviousUserReservations().subscribe((reservations)=>{
      this.prevReservations = reservations;
      this.ordersPrevLoaded = true;
    }, (error)=>{
      this.ordersPrevLoaded = true;

    })
  }

  getActiveCheckout(){
    this.checkout.getAllActiveUserCheckout().subscribe((reservations)=>{
      this.activeCheckout = reservations;
      console.log(this.activeCheckout);
      this.dataSourceActiveCheckout =  new MatTableDataSource<ActionModel>(reservations);
      this.checkoutActiveLoaded = true;
    }, (error)=>{
      this.checkoutActiveLoaded = true;
    })
  }

  getPrevCheckout(){
    this.checkout.getAllPreviousUserCheckout().subscribe((reservations)=>{
      this.prevCheckout = reservations;
      this.checkoutPrevLoaded = true;
    }, (error)=>{
      this.checkoutPrevLoaded = true;

    })
  }

  loadCheckOutDetails(action: ActionModel){
    this.router.navigateByUrl('/reservation/'+action.idReservation);
  }

}
