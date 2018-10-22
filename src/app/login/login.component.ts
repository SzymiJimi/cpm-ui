import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoginService} from '../shared/services/login.service';
import {AppService} from '../shared/services/app.service';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  emailFormEx: FormControl;
  passwordFormEx: FormControl;
  loginStarted = false;
  loginFinished = false;
  callbackMessage;

  model: any = {};

  constructor(
    private app: AppService,
    private loginService: LoginService
  ) {

    this.emailFormEx = new FormControl('', Validators.email);
      this.passwordFormEx = new FormControl('', Validators.required);
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  credentials = {username: '', password: ''};


  login() {
    this.loginStarted = true;
    this.credentials.username = this.model.username;
    this.credentials.password = this.model.password;
    this.loginService.login(this.credentials);
    this.loginService.callback.subscribe((message)=>
    {
      if(message === 'success'){
        this.loginFinished = true;
        this.callbackMessage = 'Succes! Loggin in...'
      }else{
        this.loginFinished = true;
        this.loginStarted = false;
        this.callbackMessage = 'Wrong login or password...'
      }
    })
  }


}
