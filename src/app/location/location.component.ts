import {Component, OnInit, ViewChild} from '@angular/core';
import {UserProfileService} from '../user-profile/user-profile.service';
import {AppService} from '../shared/services/app.service';
import {UserService} from '../shared/services/user.service';
import {UserModel} from '../shared/models/user.model';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {LocationModel} from '../shared/models/location.model';
import {LocationService} from './location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'address'];

  dataLoaded = false;
  dataLoadingStarted = false;

  dataSource: MatTableDataSource<LocationModel> = new MatTableDataSource<LocationModel>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;


  constructor(private router: Router,
              private app: AppService,
              private locationService: LocationService) {
    this.dataLoaded = false;
    this.dataLoadingStarted = false;
  }

  ngOnInit() {
    if (this.app.authenticated === true) {

      this.dataLoadingStarted = false;
      this.getLocations();
    } else {
      this.app.authenticatedSubject.subscribe((value) => {
        if (!this.dataLoaded && !this.dataLoadingStarted) {
          this.dataLoadingStarted = true;
          this.getLocations();
        }
      });
    }
  }


  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private getLocations() {
    this.locationService.loadLocations().subscribe((locations) => {
        this.dataSource = new MatTableDataSource<LocationModel>(locations);
        this.setDataSourceAttributes();
        this.dataLoaded = true;
        this.dataLoadingStarted = false;
        this.setDataSourceAttributes();

      },
      (error) => {
        this.dataLoadingStarted = false;

      });
  }

  showLocation(row){
    this.router.navigateByUrl('/location/'+row.idLocation);
  }

  newLocation(){
    this.router.navigateByUrl('/location/new');
  }


}
