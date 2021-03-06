import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {ActionsService} from '../actions.service';
import {ActionModel} from '../../shared/models/reservation.model';
import {AppService} from '../../shared/services/app.service';
import {UserService} from '../../shared/services/user.service';
import {ItemModel} from '../../shared/models/item.model';
import {ItemsService} from '../../items/items.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'from', 'to', 'duration', 'contact'];

  dataLoaded = false;
  dataLoadingStarted = false;

  expandedElement: any;

  dataSource: MatTableDataSource<ActionModel>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(private reservationService: ActionsService,
              private router: Router,
              private app: AppService,
              private itemService: ItemsService) {
    this.dataLoaded = false;
    this.dataLoadingStarted = false;
  }

  ngOnInit() {
    if(this.app.authenticated === true){
      this.dataLoaded= true;
      this.dataLoadingStarted = false;
      this.getCheckoutList();
    }else{
      this.app.authenticatedSubject.subscribe((value) => {
        if (!this.dataLoaded && !this.dataLoadingStarted) {
          this.dataLoadingStarted = true;
          this.getCheckoutList();
        }
      });
    }


  }

  private getCheckoutList() {
    this.reservationService.getUserReservations().subscribe((reservations) => {
        this.dataLoaded = true;
        console.log(this.reservationService.reservationsList);
        this.dataSource = new MatTableDataSource<ActionModel>(reservations);
        this.dataLoadingStarted = false;
        console.log(reservations);
        this.initialize();
      },
      (error) => {
        this.dataLoadingStarted = false;

      });
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


  selection = new SelectionModel<ActionModel>(true, []);

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

  showDetails(element: ActionModel){
    this.router.navigateByUrl("reservation/"+element.idReservation);
  }

}
