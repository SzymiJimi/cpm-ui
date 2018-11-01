import {Component, OnInit} from '@angular/core';
import {LocationModel} from '../../shared/models/location.model';
import {LocationService} from '../../location/location.service';
import {ItemModel} from '../../shared/models/item.model';
import {UserService} from '../../shared/services/user.service';
import {ItemsService} from '../items.service';

@Component({
  selector: 'app-item-new',
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.scss']
})
export class ItemNewComponent implements OnInit {

  purchaseDate;
  warrantyDate;
  addingStarted= false;

  newItem: ItemModel = new ItemModel();

  locations: LocationModel[];

  locationSet;

  constructor( private locationService: LocationService, private user: UserService, private itemService: ItemsService) {
  }

  ngOnInit() {
    this.getLocations();
  }


  selectToday() {
    this.newItem.purchaseDate = new Date();
  }

  selectWarrantyDate(years: number) {
    if (this.newItem.purchaseDate === undefined) {
      alert('Set the purchase date first!');
    } else {
      let dateOfPurchase = new Date(this.newItem.purchaseDate);
      dateOfPurchase.setFullYear(dateOfPurchase.getFullYear() + years);
      this.newItem.warrantyDate = dateOfPurchase;
    }

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

  addItem(){
    this.addingStarted=true;
    this.findLocationById(this.locationSet);
    this.setCreationUser();
    this.itemService.addItem(this.newItem).subscribe(()=>{
      console.log('Dodano pomyślnie');
    },(error)=>{
      console.log('Coś poszło nie tak');
    })
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
