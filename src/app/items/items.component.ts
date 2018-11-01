import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ItemsService} from './items.service';
import {ItemModel} from '../shared/models/item.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {LocationService} from '../location/location.service';
import {LocationModel} from '../shared/models/location.model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [ItemsService],
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ItemsComponent implements OnInit {

  displayedColumns: string[] = ['idItem', 'brand', 'model', 'value','description'];
  displayedColumnsNames: string[] = ['ID', 'Brand', 'Model', 'Value','Description'];



  dataLoaded = false;

  expandedElement: any;

  dataSource: MatTableDataSource<ItemModel>;

  private paginator: MatPaginator;
  private sort: MatSort;


  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    if (this.dataSource != undefined) {
      this.setDataSourceAttributes();
    }
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.dataSource != undefined) {
      this.setDataSourceAttributes();
    }
  }

  constructor(private itemService: ItemsService, private router: Router ) {
    this.itemService.getItems().subscribe((items) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource<ItemModel>(items);
        this.initialize();
      },
      (error) => {

      });
  }

  ngOnInit() {

  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
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


}

