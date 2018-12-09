import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ItemsService} from './items.service';
import {ItemModel} from '../shared/models/item.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {AppService} from '../shared/services/app.service';
import {LocationModel} from '../shared/models/location.model';
import {LocationService} from '../location/location.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ItemsComponent implements OnInit {

  allData: ItemModel[];

  displayedColumns: string[] = ['idItem', 'brand', 'model', 'value','description'];
  displayedColumnsNames: string[] = ['ID', 'Brand', 'Model', 'Value','Description'];

  locations: LocationModel[];

  dataLoaded = false;

  expandedElement: any;

  dataSource: MatTableDataSource<ItemModel>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(private itemService: ItemsService,
              private router: Router,
              private app: AppService,
              private locationService: LocationService) {

    if(this.app.authenticated===true){
      this.getItemList();
    }else{
      this.app.authenticatedSubject.subscribe(()=>{
          this.getItemList();
        }
      );
    }
  }

  ngOnInit() {

  }

  private getItemList(){
    console.log("Wchodzi tu egl");
    this.itemService.getItems().subscribe((items) => {
        this.dataSource = new MatTableDataSource<ItemModel>(items);
        this.allData = items;
        this.getLocations();
        this.initialize();
      },
      (error) => {

      });
  }


  displayColumnName(columnCode: string) {

    let index = this.displayedColumns.indexOf(columnCode);
    return this.displayedColumnsNames[index];
  }

  initialize() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadDetails(element) {
    this.router.navigateByUrl("item/"+element.idItem);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reserveItem(element: ItemModel){
    this.itemService.itemToReserve = element;
    this.router.navigateByUrl('reservation/new');
  }

  checkoutItem(element: ItemModel){
    this.itemService.itemToCheckout = element;
    this.router.navigateByUrl('checkout/new');
  }

  getLocations(){
    if(this.locationService.locations!==undefined){
      this.locations= this.locationService.locations;
      this.dataLoaded = true;

    }else{
      this.locationService.loadLocations().subscribe((locations: LocationModel[])=>
        {
          this.locations= locations;
          this.dataLoaded = true;
        },
        (error)=>{
          alert('Error with fetching locations! Please let the administrator know about this error...');
        })
    }
  }

  changeLocation(locationName){
    if(locationName==='all'){
      this.dataSource.data = this.allData;
    }else{
      this.dataSource.data = this.allData.filter(data=> data.location.name === locationName);
    }

  }

}

