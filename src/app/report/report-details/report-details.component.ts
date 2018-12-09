import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../items/items.service';
import {ActionModel} from '../../shared/models/reservation.model';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {ItemModel} from '../../shared/models/item.model';
import {CalendarEvent} from 'angular-calendar';
import {ActionsService} from '../../actions/actions.service';
import {ReportService} from '../report.service';
import {ReportModel} from '../../shared/models/report.model';
import {ReportType} from '../../shared/enums/report-type.enum';
import {ConfirmDialog} from '../../shared/dialogs/confirm-dialog';
import {MatDialog} from '@angular/material';
import {FinishReportDialog} from './dialog/finish-report-dialog';
declare var require: any;

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent implements OnInit {

  available = false;
  src = require('../../shared/images/item.jpg');

  selectedType;

  id: number;
  report: ReportModel;
  dataLoaded = false;
  private sub: any;

  refresh: Subject<any> = new Subject();

  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private reportService: ReportService,
              public dialog: MatDialog
  ) {
  }


  ngOnInit() {
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = +params['id'];
      this.reportService.getSingleReport(this.id).subscribe((report) => {
        this.report = report;
        this.selectedType = this.report.type;
        this.dataLoaded = true;
      });
    });
  }

  showItemDetails(){
    this.router.navigateByUrl("item/"+this.report.itemId.idItem);
  }


  isCreated(){
    return this.report.status == ReportType.CREATED;
  }

  isConsidering(){
    return this.report.status === ReportType.REPAIRING;
  }

  considerReport(){
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: {message: 'Are you sure you want consider report?'}
    });
    dialogRef.afterClosed().subscribe(result => {
       if(result ===true ){
         this.reportService.considerReport(this.report.idRequest).subscribe((newReport)=>{
           this.report= newReport;
         },(error)=>{

         });
       }
    });


  }

  finishReport(){
    this.report.type = this.selectedType;
    const dialogRef = this.dialog.open(FinishReportDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !==false ){
        this.reportService.finishReport(this.report, result).subscribe((message)=>{

        },(error)=>{

        });
      }
    });
  }


}
