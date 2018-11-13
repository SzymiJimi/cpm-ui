import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReservationModel} from '../../shared/models/reservation.model';
import {UserModel} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {AppService} from '../../shared/services/app.service';
import {UserProfileService} from '../user-profile.service';

@Component({
  selector: 'app-user-profiles-list',
  templateUrl: './user-profiles-list.component.html',
  styleUrls: ['./user-profiles-list.component.scss']
})
export class UserProfilesListComponent implements OnInit {

  displayedColumns: string[] = [ 'username', 'email', 'name', 'surname'];

  dataLoaded = false;
  dataLoadingStarted = false;

  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();
  // private paginator: MatPaginator;
  // private sort: MatSort;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;


  constructor(private router: Router,
              private app: AppService,
              private user: UserService,
              private userProfiles: UserProfileService) {
    this.dataLoaded = false;
    this.dataLoadingStarted = false;
  }

  ngOnInit() {
    if (this.app.authenticated === true) {

      this.dataLoadingStarted = false;
      this.getUserList();
    } else {
      this.app.authenticatedSubject.subscribe((value) => {
        if (!this.dataLoaded && !this.dataLoadingStarted) {
          this.dataLoadingStarted = true;
          this.getUserList();
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


  private getUserList() {
    this.userProfiles.getUserList().subscribe((users) => {
        this.dataSource = new MatTableDataSource<UserModel>(users);
        this.setDataSourceAttributes();
        this.dataLoaded = true;
        this.dataLoadingStarted = false;
        this.setDataSourceAttributes();

      },
      (error) => {
        this.dataLoadingStarted = false;

      });
  }

  showProfile(row){
    console.log(row);
    this.router.navigateByUrl('/profile/'+row.idUser);
  }

}
