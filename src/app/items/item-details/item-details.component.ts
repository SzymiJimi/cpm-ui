import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from '../items.service';
import {ItemModel} from '../../shared/models/item.model';

declare var require: any;

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  name = 'HP';
  src = require('../../shared/images/item.jpg');
  id: number;
  item: ItemModel;
  dataLoaded = false;
  private sub: any;

  constructor(private router: ActivatedRoute, private itemService: ItemsService) {
  }


  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.id = +params['id'];
      this.getItemFromDb();
    });
  }

  private getItemFromDb() {
    this.itemService.getSingleItem(this.id).subscribe((item) => {
      this.item = item;
      this.dataLoaded = true;
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
