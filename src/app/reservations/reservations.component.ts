import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemModel} from '../shared/models/item.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ItemsService} from '../items/items.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectionModel} from '@angular/cdk/collections';
import {ReservationsService} from './reservations.service';
import {ReservationModel} from '../shared/models/reservation.model';
import {AppService} from '../shared/services/app.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  providers:[ReservationsService]
})
export class ReservationsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'from', 'to', 'duration','contact'];

  dataLoaded = false;

  expandedElement: any;

  dataSource: MatTableDataSource<ReservationModel>;

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

  constructor(private reservationService: ReservationsService, private router: Router , private app: AppService) {

  }

  ngOnInit() {
    if(this.app.authenticated===true){
      this.getReservationList();
    }else{
      this.app.authenticatedSubject.subscribe(()=>{
        this.getReservationList();
        }
      );
    }
  }

  private getReservationList(){
    this.reservationService.getUserReservations().subscribe((reservations) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource<ReservationModel>(reservations);
        this.initialize();
      },
      (error) => {

      });
  }


  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  calculateDuration(from: Date, to: Date){
    let newFrom = new Date(from);
    let newTo = new Date(to);
    let fromInMs = newFrom.getTime();
    let toInMs = newTo.getTime();
    return (toInMs - fromInMs)  / 1000 / 60 / 60 / 24;

  }

  initialize() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  selection = new SelectionModel<ReservationModel>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
