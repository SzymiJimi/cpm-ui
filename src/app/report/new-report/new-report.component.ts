import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActionsService} from '../../actions/actions.service';
import {ItemModel} from '../../shared/models/item.model';
import {ReservationListDialogComponent} from '../../actions/reservations/reservation-new/reservations-dialog/reservation-list-dialog.component';
import {ActionModel} from '../../shared/models/reservation.model';
import {UserService} from '../../shared/services/user.service';
import {ItemsService} from '../../items/items.service';
import {LocationService} from '../../location/location.service';
import {FormControl} from '@angular/forms';
import {ReportModel} from '../../shared/models/report.model';
import {ReportService} from '../report.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.scss']
})
export class NewReportComponent implements OnInit {

  itemChecked=false;
  reportingStarted= false;
  myControl = new FormControl();
  reportingItem: ItemModel;

  newReport: ReportModel = new ReportModel();


  constructor( private user: UserService,
               private itemService: ItemsService,
               private reportService: ReportService) {
  }

  ngOnInit() {
    this.reportingItem = this.itemService.itemToReport;
    this.itemChecked = true;
  }


  reportItem(){
      this.newReport.itemId = this.reportingItem;
      this.newReport.declarant = this.user.user;
      console.log(this.newReport);
      this.reportService.reportItem(this.newReport).subscribe((value)=>{
        console.log(value);
      },(error)=>{
        console.log(error);
      });
      this.itemService.itemToReserve = undefined;
  }






}
