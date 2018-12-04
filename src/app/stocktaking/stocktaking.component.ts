import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemModel} from '../shared/models/item.model';
import {LocationModel} from '../shared/models/location.model';
import {UserService} from '../shared/services/user.service';
import {ItemsService} from '../items/items.service';
import {LocationService} from '../location/location.service';
import {Router} from '@angular/router';
import {StocktakingService} from './stocktaking.service';
import {ReportModel} from '../shared/models/report.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AppService} from '../shared/services/app.service';
import {ReportService} from '../report/report.service';
import {StocktakingModel} from '../shared/models/stocktaking.model';

@Component({
  selector: 'app-stocktaking',
  templateUrl: './stocktaking.component.html',
  styleUrls: ['./stocktaking.component.scss']
})
export class StocktakingComponent implements OnInit {

  displayedColumns: string[] = ['start', 'finish', 'finished' , 'type', 'method','location', 'manager'];
  dataLoaded = false;

  dataSource: MatTableDataSource<StocktakingModel>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(private router: Router,
              private app: AppService,
              private userService: UserService,
              private stocktakingService: StocktakingService) {

    if(this.app.authenticated===true){
      this.getStocktakingList();
    }else{
      this.app.authenticatedSubject.subscribe(()=>{
          this.getStocktakingList();
        }
      );
    }
  }

  ngOnInit() {

  }

  private getStocktakingList(){
    console.log(this.userService.user.idUser);
    this.stocktakingService.findAllStocktakingsForManagerLocation(this.userService.user.idUser).subscribe((stocktakings) => {
      console.log(stocktakings);
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource<StocktakingModel>(stocktakings);
        this.initialize();
      },
      (error) => {

      });
  }


  initialize() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadDetails(element) {
    this.router.navigateByUrl("stocktaking/started/"+element.idStocktaking);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
