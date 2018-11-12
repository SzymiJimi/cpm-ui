import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../shared/services/user.service';
import {ReservationsService} from '../reservations/reservations.service';
import {ReservationModel} from '../shared/models/reservation.model';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';
import {AppService} from '../shared/services/app.service';
import {CheckOutService} from './check-out.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'from', 'to', 'duration', 'contact'];

  dataLoaded = false;
  dataLoadingStarted = false;

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

  constructor(private checkoutService: CheckOutService, private router: Router, private app: AppService, private user: UserService) {
    this.dataLoaded = false;
    this.dataLoadingStarted = false;
  }

  ngOnInit() {
    if(this.app.authenticated === true){
      this.dataLoaded= true;
      this.dataLoadingStarted = false;
      this.getCheckOutList();
    }else{
      this.app.authenticatedSubject.subscribe((value) => {
        if (!this.dataLoaded && !this.dataLoadingStarted) {
          this.dataLoadingStarted = true;
          this.getCheckOutList();
        }
      });
    }


  }

  private getCheckOutList() {
    this.checkoutService.getUserCheckouts().subscribe((reservations) => {
        this.dataLoaded = true;
        console.log(this.checkoutService.checkOutsList);
        this.dataSource = new MatTableDataSource<ReservationModel>(reservations);
        this.dataLoadingStarted = false;
        console.log(reservations);
        this.initialize();
      },
      (error) => {
        this.dataLoadingStarted = false;

      });
  }


  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  calculateDuration(from: Date, to: Date) {
    let newFrom = new Date(from);
    let newTo = new Date(to);
    let fromInMs = newFrom.getTime();
    let toInMs = newTo.getTime();
    return (toInMs - fromInMs) / 1000 / 60 / 60 / 24;

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
