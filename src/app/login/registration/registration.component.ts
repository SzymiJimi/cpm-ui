import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {LoginService} from '../../shared/services/login.service';
import {AppService} from '../../shared/services/app.service';
import {UserModel} from '../../shared/models/user.model';
import {PersonaldataModel} from '../../shared/models/personaldata.model';
import {Validator} from 'codelyzer/walkerFactory/walkerFn';
import {equal} from 'assert';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  startAt: Date = new Date('1990-01-01T00:00:00');

  emailFormEx: FormControl;
  passForm: FormControl;
  secPassForm: FormControl;
  nameForm: FormControl;
  surnameForm: FormControl;
  usernameForm: FormControl;

  registerForm: FormGroup;

  loginStarted = false;
  loginFinished = false;
  callbackMessage;

  newUser: UserModel = new UserModel();

  model: any = {};

  optionsSelect: Array<any>;

  constructor(
    private app: AppService,
    private loginService: LoginService,
    private router: Router
  ) {

    this.emailFormEx = new FormControl('', Validators.email);
    this.passForm = new FormControl('', Validators.required);
    this.secPassForm = new FormControl('', Validators.required);
    this.nameForm = new FormControl('', Validators.required);
    this.surnameForm = new FormControl('', Validators.required);
    this.usernameForm = new FormControl('', Validators.required);

    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      secondPassword: new FormControl('', Validators.compose( [Validators.required , this.areEqual('password')]) ),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)}
    );
  }



  private areEqual(otherControlName: string): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl
          .valueChanges
          .subscribe(() => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          });
      }

      return (otherControl && control.value !== otherControl.value) ? {match: true} : null;
    };

  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.optionsSelect = [
      { value: 'M', label: 'Male' },
      { value: 'F', label: 'Female' },
    ];
  }


  register(){
    this.loginStarted = true;
    this.newUser.username=this.registerForm.value.username;
    this.newUser.email = this.registerForm.value.email;
    this.newUser.password = this.registerForm.value.password;
    this.newUser.personal_data = new PersonaldataModel();
    this.newUser.personal_data.name = this.registerForm.value.name;
    this.newUser.personal_data.surname = this.registerForm.value.surname;
    this.newUser.personal_data.date_of_birth =  this.registerForm.value.dateOfBirth;
    this.newUser.personal_data.gender =  this.registerForm.value.gender;

    this.loginService.register(this.newUser).subscribe((message)=>{
      this.callbackMessage = message;
        this.loginStarted = false;
        this.loginFinished = true;
        this.router.navigateByUrl('login');
    },
      (error)=>{
        this.callbackMessage = error;
        this.loginStarted = false;
        this.loginFinished = true;
      });

  }



}
