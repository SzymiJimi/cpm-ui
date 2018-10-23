import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AppService} from '../services/app.service';

@Directive({
  selector: '[appUnauthorized]'
})
export class UnauthorizedDirective implements OnInit{

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef, private appService: AppService) { }

  showed=false;

  ngOnInit(){
    this.appService.authenticatedSubject.subscribe((value => {
      if(!value){
        if(this.showed === false)
        {
          this.vcRef.createEmbeddedView(this.templateRef);
          this.showed = true;
        }
      }else{
        this.vcRef.clear();
        this.showed = false;
      }
    }));

  }

}
