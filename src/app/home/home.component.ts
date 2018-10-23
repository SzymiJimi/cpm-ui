import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {AppService} from '../shared/services/app.service';
import {Subscriber, Subscription} from 'rxjs';
import {UserModel} from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  pageLoaded = true;

  dateToShow;

  constructor(private userService: UserService,
              private app: AppService) {

  }

  ngOnInit() {
    let date = new Date();
    this.dateToShow = "  "+date.getDate()+" / "+date.getMonth()+" / "+date.getFullYear();
  }

  logout() {
    this.app.changeAuthenticated(false);
    this.userService.user = new UserModel();
    sessionStorage.setItem('token', '');
  }

  authenticated() { return this.app.authenticated; }


}
