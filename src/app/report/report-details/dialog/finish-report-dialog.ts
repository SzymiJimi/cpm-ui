import {Component} from '@angular/core';
import {ConfirmDialogData} from '../../../shared/interfaces/confirm-dialog-data.interface';


@Component({
  selector: 'confirm-dialog',
  templateUrl: 'finish-report-dialog.html',
})
export class FinishReportDialog{
  data: ConfirmDialogData = {message: ''};
}
