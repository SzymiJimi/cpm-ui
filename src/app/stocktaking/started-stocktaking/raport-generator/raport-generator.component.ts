import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {SheetModel} from '../../../shared/models/sheet.model';

@Component({
  selector: 'app-raport-generator',
  templateUrl: './raport-generator.component.html',
  styleUrls: ['./raport-generator.component.scss']
})
export class RaportGeneratorComponent implements OnInit {


  @ViewChild('content') content: ElementRef;

  @Input('data') data : SheetModel[];

  constructor() { }

  ngOnInit() {
    this.generate();
  }


  generate(){
    // console.log(this.content);
    // let doc = new jsPDF('p','pt','a4');
    //
    // let specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };
    //
    // let content = this.content.nativeElement;
    //
    // doc.fromHTML(content.innerHTML, 15,15,{
    //     'width' : 190,
    //     'elementHandlers' : specialElementHandlers},
    //   function() { doc.save('Invoice.pdf');
    //   });
    //
    // doc.save('test.pdf')
    // html2canvas(document.body, {
    //   onrendered: function (canvas) {
    //
    //     var img = canvas.toDataURL("image/png");
    //     var doc = new jsPDF();
    //     doc.addImage(img, 'JPEG', 20, 20);
    //     doc.save('test.pdf');
    //
    //   }
    //
    // }
  }
}
