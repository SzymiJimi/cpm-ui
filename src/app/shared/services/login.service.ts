import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AppService} from './app.service';
import {UserService} from './user.service';
import {UserModel} from '../models/user.model';
import {ReportModel} from '../models/report.model';

@Injectable()
export class LoginService{
  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private app: AppService){

  }

  callback : Subject<string> = new Subject;

  login(credentials: {username: string, password: string}){

    let url = environment.endpointBase + 'login';
    this.http.post<Observable<boolean>>(url, {
      username: credentials.username,
      password: credentials.password
    }, this.app.options).subscribe(isValid => {
      if (isValid) {
        this.logUserIn(credentials);
      } else {
        this.failLogIn();
      }
    });
  }

  private failLogIn(){
    this.app.changeAuthenticated(false);
    this.callback.next('error');
  }

  private logUserIn(credentials: {username: string, password: string}){
    this.callback.next('success');

    sessionStorage.setItem(
      'token',
      btoa(credentials.username + ':' + credentials.password)
    );

    this.userService.loadUser().subscribe(()=> {
      this.app.changeAuthenticated(true);
      this.router.navigateByUrl('/');
    });
  }


  register(newUser: UserModel){
    return new Observable<any>((observer) => {
      this.http.post(environment.endpointBase + 'register/new', newUser ,
        {observe: 'response',
                  headers: { 'Content-Type': 'application/json' },
                  responseType: 'text'})
        .subscribe(res => {
          console.log(res['body']);
          observer.next(res['body']);
          observer.complete();
        },
        error => {
          console.log(error);
          observer.error(error.message);
          observer.complete();
        }
      );
    });
  }

}
