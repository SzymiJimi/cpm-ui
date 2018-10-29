import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AppService} from '../services/app.service';
import {UserService} from '../services/user.service';
import {Roles} from '../enums/roles.enum';

@Directive({
  selector: '[appManager]'
})
export class ManagerDirective {

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef, private userService: UserService) {
  }

  showed = false;

  ngOnInit() {
    if (this.userService.user.idRole.name === Roles.MANAGER) {
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
