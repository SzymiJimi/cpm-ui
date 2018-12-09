import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoginService} from '../../shared/services/login.service';
import {AppService} from '../../shared/services/app.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  startAt: Date = new Date('1990-01-01T00:00:00');
  emailFormEx: FormControl;
  passwordFormEx: FormControl;
  loginStarted = false;
  loginFinished = false;
  callbackMessage;

  model: any = {};

  optionsSelect: Array<any>;

  constructor(
    private app: AppService,
    private loginService: LoginService
  ) {

    this.emailFormEx = new FormControl('', Validators.email);
    this.passwordFormEx = new FormControl('', Validators.required);
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.optionsSelect = [
      { value: 'M', label: 'Male' },
      { value: 'F', label: 'Female' },
    ];
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
