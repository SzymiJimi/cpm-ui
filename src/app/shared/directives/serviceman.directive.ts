import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {Roles} from '../enums/roles.enum';
import {UserService} from '../services/user.service';

@Directive({
  selector: '[appServiceman]'
})
export class ServicemanDirective {

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef, private userService: UserService) {
  }

  showed = false;

  ngOnInit() {
    if (this.userService.user.idRole.name === Roles.SERVICE) {
      if (this.showed === false) {
        this.show();
      }
    } else {
      this.clear();
    }

  }

  private show() {
    this.vcRef.createEmbeddedView(this.templateRef);
    this.showed = true;
  }

  private clear() {
    this.vcRef.clear();
    this.showed = false;
  }
}
