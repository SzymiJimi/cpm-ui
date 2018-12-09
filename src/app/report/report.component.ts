import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ItemsService} from '../items/items.service';
import {ReportModel} from '../shared/models/report.model';
import {AppService} from '../shared/services/app.service';
import {Router} from '@angular/router';
import {ReportService} from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  displayedColumns: string[] = ['brand', 'model', 'description', 'eventDate','type', 'status'];

  dataLoaded = false;
  filterStatus;
  filterType;

  expandedElement: any;

  dataSource: MatTableDataSource<ReportModel>;
  allData: ReportModel[];

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
    this.reportService.getAllReports().subscribe((reports) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource<ReportModel>(reports);
        this.allData = reports;
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

  changeStatus(status){
    this.filterStatus = status;
    this.filterDataStatus(this.allData);
    if(this.filterType!==undefined){
      this.filterDataType(this.dataSource.data);
    }
  }

  changeType(type){
    this.filterType= type;
    this.filterDataType(this.allData);
    if(this.filterStatus!==undefined){
      this.filterDataStatus(this.dataSource.data);
    }
  }

  filterDataStatus(reportData: ReportModel[]){
    if(this.filterStatus==='ALL'){
      if(this.filterType!=='ALL' && this.filterType!==undefined){
        this.dataSource.data = this.allData;
        this.filterDataType(this.allData);
      }else{
        this.dataSource.data = this.allData;
      }
    }else{
      this.dataSource.data = reportData.filter(data=> data.status === this.filterStatus);
    }
  }

  filterDataType(reportData: ReportModel[]){
    if(this.filterType==='ALL' ){
      if(this.filterStatus!=='ALL' && this.filterType!==undefined){
        this.dataSource.data = this.allData;
        this.filterDataStatus(this.allData);
      }else{
        this.dataSource.data = this.allData;
      }
    }else{
      this.dataSource.data = reportData.filter(data=> data.type === this.filterType);
    }
  }

  showReportDetail(element: ReportModel){
    this.router.navigateByUrl('report/'+element.idRequest);
  }



}
