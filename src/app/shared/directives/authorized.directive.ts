import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AppService} from '../services/app.service';

@Directive({
  selector: '[appAuthorized]'
})
export class AuthorizedDirective implements OnInit{

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef, private appService: AppService) { }

  showed=false;

  ngOnInit(){
    if(this.appService.authenticated===true){
      this.show();
    }
    this.appService.authenticatedSubject.subscribe((value => {
      if(value){
        if(this.showed === false)
        {
          this.show();
        }
      }else{
        this.clear();
      }
    }));

  }

  private show(){
    this.vcRef.createEmbeddedView(this.templateRef);
    this.showed = true;
  }

  private clear(){
    this.vcRef.clear();
    this.showed = false;
  }
}
