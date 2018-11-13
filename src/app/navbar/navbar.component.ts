import {Component, OnInit} from '@angular/core';
import {UserModel} from '../shared/models/user.model';
import {AppService} from '../shared/services/app.service';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {Roles} from '../shared/enums/roles.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  personData: string;

  constructor(private userService: UserService,
              private app: AppService,
              private router: Router) { }

  ngOnInit() {
    this.userService.personData.subscribe((data)=>{
      this.personData = data;
    });
  }

  logout() {
    this.app.changeAuthenticated(false);
    this.userService.user = new UserModel();
    sessionStorage.setItem('token', '');
    this.router.navigateByUrl('/');

  }

  navigateLogin(){
    this.router.navigate(['login']);
  }

  navigateItems()
  {
    this.router.navigate(['items']);
  }

  showItemSideBar(){
    if(this.userService.user!==undefined){
      if(this.userService.user.idRole.name===Roles.MANAGER)
      {
        if(this.router.url.includes('item')){
          return true;
        }
      }
    }
    return false;

  }

  showReservationSideBar(){
    if(this.userService.user!==undefined){
      if(this.userService.user.idRole.name===Roles.MANAGER)
      {
        if(this.router.url.includes('reservation')){
          return true;
        }
      }
    }
    return false;

  }

  showCheckOutSideBar(){
    if(this.userService.user!==undefined){
      if(this.userService.user.idRole.name===Roles.MANAGER)
      {
        if(this.router.url.includes('checkout')){
          return true;
        }
      }
    }
    return false;
  }

}