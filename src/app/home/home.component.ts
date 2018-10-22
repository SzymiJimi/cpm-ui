import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {AppService} from '../shared/services/app.service';
import {Subscriber, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  pageLoaded = true;
  userName: string;

  constructor(private userService: UserService,
              private app: AppService) {

  }

  ngOnInit() {
    this.userName = this.userService.userString;
    console.log(this.userService.userString);
  }

  logout() {
    this.app.authenticated = false;
    this.userService.userString = '';
    sessionStorage.setItem('token', '');
  }


  authenticated() { return this.app.authenticated; }


}
