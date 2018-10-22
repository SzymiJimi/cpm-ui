import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppService} from './shared/services/app.service';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import '../../node_modules/rxjs/add/operator/finally';
import {UserService} from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'cpm-ui';
  constructor(private app: AppService, private userService: UserService, private router: Router) {

  }

  dataChecked = false;

  ngOnInit(){
    this.userService.loadUser().subscribe(
      ()=>{
      this.app.authenticated = true;
        this.dataChecked = true;
    },
      ()=>{
        this.app.authenticated = false;
        this.dataChecked = true;
      } );
  }

}
