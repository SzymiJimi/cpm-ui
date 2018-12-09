import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ReportModel} from '../../shared/models/report.model';
import {AppService} from '../../shared/services/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportService} from '../../report/report.service';
import {ItemsService} from '../../items/items.service';
import {StocktakingService} from '../stocktaking.service';
import {SheetModel} from '../../shared/models/sheet.model';
import {StocktakingModel} from '../../shared/models/stocktaking.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
declare var xepOnline: any;


@Component({
  selector: 'app-started-stocktaking',
  templateUrl: './started-stocktaking.component.html',
  styleUrls: ['./started-stocktaking.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class StartedStocktakingComponent implements OnInit {
  displayedColumns: string[] = ['name','code', 'unit', 'quantity', 'price','value', 'comments', 'checked'];
  displayedColumnsForPDF: string[] = ['name','code', 'unit', 'quantity', 'price','value', 'comments'];

  dataLoaded = false;
  generateRaportPDF = false;

  private sub: any;
  id: number;

  readyToFinish: boolean = false;
  finished: boolean = false;

  dataSource: MatTableDataSource<SheetModel>;
  stocktaking: StocktakingModel;

  @ViewChild('pdfile') content: ElementRef;

  expandedElement: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;
  constructor(private itemService: ItemsService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private app: AppService,
              private stocktakingService: StocktakingService) {

    if(this.app.authenticated===true){
      this.getIdStocktaking();
    }else{
      this.app.authenticatedSubject.subscribe(()=>{
          this.getIdStocktaking();
        }
      );
    }
  }

  ngOnInit() {

  }


  private getIdStocktaking(){
    this.sub = this.activatedRouter.params.subscribe(params => {
      this.id = +params['id'];
      this.getStocktakingData();
      this.getSheetData();

    });
  }

  private getStocktakingData(){
    this.stocktakingService.getStocktakingById(this.id).subscribe((stocktaking)=>{
      this.stocktaking = stocktaking;
      console.log(this.stocktaking);
      if(this.stocktaking.finish){
        this.finished = true;
      }
    });
  }
  private getSheetData(){
    this.stocktakingService.getSheetListForStocktaking(this.id).subscribe((sheets) => {
        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource<SheetModel>(sheets);
        this.initialize();
      },
      (error) => {

      });
  }


  initialize() {
    this.checkPosibilityToFinish();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  confirmSheetElement(element){
    element.checked = 1;
    this.expandedElement===undefined ? this.expandedElement = element: this.expandedElement = undefined;
    this.checkPosibilityToFinish();
  }

  checkPosibilityToFinish() {
    let ready = true;
    this.dataSource.data.map(value=>{
      if(value.checked ===0 ){
        ready = false;
      }
    });
    this.readyToFinish = ready;
  }

  saveState(){
    this.stocktakingService.saveSheetsState(this.dataSource.data).subscribe((sheets)=>{
      this.dataSource.data = sheets;
    });
  }

  finishStocktaking(){
    this.saveState();
    this.stocktakingService.finishStocktaking(this.stocktaking).subscribe((value)=>{

    });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  downloadFile(){

  }

  generate(){
      let doc = new jsPDF('p','pt','a4');

      let specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };

      let content = this.content.nativeElement;

      doc.fromHTML(content.innerHTML, 15,15,{
          'width' : 240,
          'elementHandlers' : specialElementHandlers},
        function() { doc.save('Invoice.pdf');
        });
    // return xepOnline.Formatter.Format('pdfile', {render: 'download'});
  }

    // const filename  = 'test.pdf';
    //
    // html2canvas(document.querySelector('#pdfile'), {scale: 1}).then(canvas => {
    //   let pdf = new jsPDF('p', 'mm', 'a4');
    //   pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
    //   pdf.save(filename);
    // });
  //   this.generateRaportPDF = true;
  //   console.log(this.content);
  //   let doc = new jsPDF('p','pt','a4');
  //
  //   let specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };
  //
  //   let content = this.content.nativeElement;
  //
  //   doc.fromHTML(content.innerHTML, 15,15,{
  //       'width' : 240,
  //       'elementHandlers' : specialElementHandlers},
  //     function() { doc.save('Invoice.pdf');
  //     });
  //
  // }
}
