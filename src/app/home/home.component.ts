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


  dateToShow;

  constructor(private app: AppService) {
    console.log(this.app.authenticated);
  }

  ngOnInit() {
    this.app.authenticatedSubject.subscribe((value)=>
    {
      console.log('Zmieniono auth');
      console.log(this.app.authenticated);
    });
    let date = new Date();
    this.dateToShow = "  "+date.getDate()+" / "+(date.getMonth()+1)+" / "+date.getFullYear();
  }



}
