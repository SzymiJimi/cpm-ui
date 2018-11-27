import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemModel} from '../../shared/models/item.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ItemsService} from '../../items/items.service';
import {Router} from '@angular/router';
import {AppService} from '../../shared/services/app.service';
import {ReportModel} from '../../shared/models/report.model';
import {ReportService} from '../report.service';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.scss']
})
export class UserReportsComponent implements OnInit {

  displayedColumns: string[] = ['brand', 'model', 'description', 'eventDate','type', 'status'];

  dataLoaded = false;

  expandedElement: any;

  dataSource: MatTableDataSource<ReportModel>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(private itemService: ItemsService, private router: Router, private app: AppService, private reportService: ReportService) {

    if(this.app.authenticated===true){
      this.getReportList();
    }else{
      this.app.authenticatedSubject.subscribe(()=>{
          this.getReportList();
        }
      );
    }
  }

  ngOnInit() {

  }

  private getReportList(){
    this.reportService.getUserReports().subscribe((reports) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource<ReportModel>(reports);
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
    this.router.navigateByUrl("item/"+element.idItem);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
