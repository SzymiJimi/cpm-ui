import { Component, OnInit } from '@angular/core';
import {ItemModel} from '../../shared/models/item.model';
import {UserService} from '../../shared/services/user.service';
import {LocationModel} from '../../shared/models/location.model';
import {ItemsService} from '../../items/items.service';
import {LocationService} from '../location.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit {


  addingStarted= false;

  newLocation: LocationModel = new LocationModel();

  constructor( private locationService: LocationService,
               private router: Router) {
  }

  ngOnInit() {
  }


  addLocation(){
    this.addingStarted=true;
    this.locationService.addLocation(this.newLocation).subscribe(()=>{
      console.log('Poszło ok');
      this.router.navigateByUrl('/');
    },(error)=>{
      console.log('Coś nie tak');
      // console.log('Coś poszło nie tak');
    })
  }


}
