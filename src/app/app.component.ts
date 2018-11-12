import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from './shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import '../../node_modules/rxjs/add/operator/finally';
import {UserService} from './shared/services/user.service';
import {LoginService} from './shared/services/login.service';
import {LocationService} from './location/location.service';
import {Roles} from './shared/enums/roles.enum';
import {ItemsService} from './items/items.service';
import {ReservationsService} from './reservations/reservations.service';
import {CheckOutComponent} from './check-out/check-out.component';
import {CheckOutService} from './check-out/check-out.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [LoginService, LocationService, ItemsService, ReservationsService, CheckOutService]
})
export class AppComponent implements OnInit{

  constructor(private app: AppService, private userService: UserService, private router: Router) {
  }

  dataChecked = false;
  personData:string ='';
  authenticated= false;

  ngOnInit(){
    this.app.authenticatedSubject.next(false);
    this.checkAuth();
    this.userService.loadUser().subscribe(
      ()=>{
        this.app.changeAuthenticated(true);
        this.dataChecked = true;
        this.personData= this.userService.user.idPersonaldata.name + ' ' + this.userService.user.idPersonaldata.surname;
    },
      ()=>{
        this.app.changeAuthenticated(false);
        this.dataChecked = true;
      } );
  }

  checkAuth(){
    this.authenticated =  this.app.authenticated;
  }

}
