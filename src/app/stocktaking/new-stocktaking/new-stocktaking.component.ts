import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {StocktakingService} from '../stocktaking.service';
import {ItemModel} from '../../shared/models/item.model';
import {LocationService} from '../../location/location.service';
import {Router} from '@angular/router';
import {LocationModel} from '../../shared/models/location.model';
import {StocktakingModel} from '../../shared/models/stocktaking.model';

@Component({
  selector: 'app-new-stocktaking',
  templateUrl: './new-stocktaking.component.html',
  styleUrls: ['./new-stocktaking.component.scss']
})
export class NewStocktakingComponent implements OnInit {

  purchaseDate;
  warrantyDate;
  addingStarted= false;
  lastDate;
  lastDateNull= false;

  dataLoaded= false;

  newItem: ItemModel = new ItemModel();

  locations: LocationModel[];

  location: LocationModel;


  constructor( private locationService: LocationService,
               private user: UserService,
               private stocktakingService: StocktakingService,
               private router: Router) {
  }

  ngOnInit() {
    if(this.user.user ===undefined){
      this.user.loadUser().subscribe(()=>{
        this.findLocationForInventoryManager();
      });
    }else{
      this.findLocationForInventoryManager();
    }

  }


  getInventoryManager(){
    return this.user.user.idPersonaldata.name+ ' '+ this.user.user.idPersonaldata.surname;
  }

  findLocationForInventoryManager(){

    this.stocktakingService.findLocationForInventoryManager(this.user.user.idUser).subscribe((location)=>{
      this.location = location;
      this.findLastStocktakingForLocation();
    });

  }

  findLastStocktakingForLocation(){
    this.stocktakingService.findLastStocktakingForLocation(this.location.idLocation).subscribe((date)=>{
        if(date===null){
          this.lastDateNull = true;
          this.lastDate = "NOT YET"
        }else{
          this.lastDate = date;
        }
        this.dataLoaded = true;
    }, (error)=>{

    })
  }

  startStocktaking(){
    let stocktaking: StocktakingModel = new StocktakingModel();
    stocktaking.location = this.location;
    stocktaking.manager = this.user.user;
    this.stocktakingService.startNewStocktaking(stocktaking).subscribe((value) => {

    },(error)=>{

    });
  }


  getLocations(){
    if(this.locationService.locations!==undefined){
      this.locations= this.locationService.locations;
    }else{
      this.locationService.loadLocations().subscribe((locations: LocationModel[])=>
        {
          this.locations= locations;
        },
        (error)=>{
          alert('Error with fetching locations! Please let the administrator know about this error...');
        })
    }
  }


  findLocationById(id: number){
    this.locations.forEach((location)=>{
      if(location.idLocation == id){
        this.newItem.location = location;
      }
    });

  }

  setCreationUser(){
    this.newItem.creationUser = this.user.user;
  }
}
