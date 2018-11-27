import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonaldataModel} from '../../shared/models/personaldata.model';
import {LocationService} from '../location.service';
import {LocationModel} from '../../shared/models/location.model';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {

  id;

  dataLoaded = false;
  private sub: any;

  responseMessage= '';

  location: LocationModel;
  locationEditStarted = false;
  newLocation: LocationModel;


  constructor(private router: Router,
              private actviatedRouter: ActivatedRoute,
              private locationService: LocationService) {

  }


  ngOnInit() {
    this.sub = this.actviatedRouter.params.subscribe(params => {
      this.id = +params['id'];
      this.getLocationFromDb(this.id);
    });

  }


  editLocation(){
    this.newLocation= this.location;
    this.locationEditStarted = true;
    console.log(this.newLocation);
  }

  saveLocation(){
    this.locationService.updateLocation(this.newLocation).subscribe((value => {
      this.locationEditStarted = false;
      this.location = this.newLocation;
    }), error1 => {
      this.locationEditStarted = false;
    });

  }

  private getLocationFromDb(id){
      this.locationService.loadSingleLocation(id).subscribe((value)=>{
          this.location = value;
          this.dataLoaded = true;
        },
        (error)=>{

        })
    }

  deleteLocation(){
    confirm('Are you sure, that you want delete location?');
    this.locationService.deleteLocation(this.location).subscribe((value)=>{
      this.router.navigateByUrl('/');
    },
      (error)=>{

      })
  }


}
