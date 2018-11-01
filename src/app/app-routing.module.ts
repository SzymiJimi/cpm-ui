import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ItemsComponent} from './items/items.component';
import {ItemDetailsComponent} from './items/item-details/item-details.component';
import {ItemNewComponent} from './items/item-new/item-new.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item/new', component: ItemNewComponent },
  { path: 'item/:id', component: ItemDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
