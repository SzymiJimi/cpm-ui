import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AppService} from './app.service';
import {UserService} from './user.service';

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
    }).subscribe(isValid => {
      if (isValid) {
        this.logUserIn(credentials);
      } else {
        this.failLogIn();
      }
    });
  }

  private failLogIn(){
    this.app.authenticated = false;
    this.callback.next('error');
  }

  private logUserIn(credentials: {username: string, password: string}){
    this.callback.next('success');
    this.app.authenticated = true;
    sessionStorage.setItem(
      'token',
      btoa(credentials.username + ':' + credentials.password)
    );
    this.userService.loadUser().subscribe((user)=> {
      this.router.navigate(['']);
    });
  }

}
