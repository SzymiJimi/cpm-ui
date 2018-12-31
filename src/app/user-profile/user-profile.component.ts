import { Component, OnInit } from '@angular/core';
import {ItemModel} from '../shared/models/item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../shared/models/user.model';
import {UserService} from '../shared/services/user.service';
import {PersonaldataModel} from '../shared/models/personaldata.model';
import {UserProfileService} from './user-profile.service';
import {ActionsService} from '../actions/actions.service';
import {ActionModel} from '../shared/models/reservation.model';

declare var require: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit {

  name = 'Profile';
  src = require('../shared/images/profile.jpg');
  id;

  dataLoaded = false;
  item: ItemModel;
  user: UserModel = this.userService.user;
  private sub: any;

  responseMessage= '';

  newUserRole;
  changingRole = false;
  availableRoles = ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_HEAD'];

  changingPersonalData = false;
  newPersonalData: PersonaldataModel;
  userActionsHistory: ActionModel[];
  userActionsActual: ActionModel[];
  actionsLoaded = false;


  constructor(private router: ActivatedRoute,
              private navRouter: Router,
              private userService: UserService,
              private userProfileService: UserProfileService,
              private reservationService: ActionsService) {

  }


  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.id = +params['id'];
      this.userFromDb(this.id);
    });
  }


  changeUserRole(){
    this.responseMessage= '';
    this.newUserRole = this.user.idRole.name;
    this.changingRole = true;
  }

  changePersonalData(){
    this.responseMessage= '';
    this.newPersonalData = this.user.idPersonaldata;
    this.changingPersonalData = true;
  }

  saveNewRole(){
    this.userProfileService.checkManagerRigths().subscribe((message)=>{
      this.userProfileService.userProfileOpened = this.user;
      this.userProfileService.changeRole(this.newUserRole).subscribe((message)=>{
        this.responseMessage = message;
        this.changingRole = false;
      },(error)=>{
        this.responseMessage = error;
        this.changingRole = false;
      });
    }, (error)=>{
      this.responseMessage = error;
      this.changingRole = false;

    });

  }

  saveNewPersonalData(){
    this.userProfileService.userProfileOpened = this.user;
    this.userProfileService.changePersonalData(this.newPersonalData).subscribe((message)=>{
      this.responseMessage = message;
      this.changingPersonalData = false;

    },(error) => {
      this.responseMessage = error;
      this.changingPersonalData = false;
    } )
  }

  private userFromDb(id){
    if(isNaN(id)){
      this.loadLoggedUser();
    }else{
      this.userService.getUserById(id).subscribe((value)=>{
          this.user = value;
          this.dataLoaded = true;
          this.getUserActions(value.idUser);
        },
        (error)=>{

        })
    }
  }

  loadLoggedUser(){
    if(this.userService.user === undefined){
      this.userService.personData.subscribe(()=>{
        this.user = this.userService.user;
        this.dataLoaded = true;
      });
    }else{
      this.user = this.userService.user;
      this.dataLoaded = true;
    }
  }


  private getUserActions(id: number){
    this.reservationService.getAllUserActions('before',id).subscribe((actions)=>{
      this.userActionsHistory = actions;
      this.reservationService.getAllUserActions('after', id).subscribe((actionsAfter)=>{
        this.userActionsActual = actionsAfter;
        this.actionsLoaded = true;
      });
    },(error)=>{

    })
  }

  openDetails(action: ActionModel){
    this.navRouter.navigateByUrl('reservation/'+ action.idReservation);
  }


}
