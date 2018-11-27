import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ItemsComponent} from './items/items.component';
import {ItemDetailsComponent} from './items/item-details/item-details.component';
import {ItemNewComponent} from './items/item-new/item-new.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {ReservationNewComponent} from './reservations/reservation-new/reservation-new.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {CheckOutNewComponent} from './check-out/check-out-new/check-out-new.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserProfilesListComponent} from './user-profile/user-profiles-list/user-profiles-list.component';
import {RequestDetailsComponent} from './reservations/request-details/request-details.component';
import {LocationComponent} from './location/location.component';
import {LocationDetailsComponent} from './location/location-details/location-details.component';
import {NewLocationComponent} from './location/new-location/new-location.component';
import {NewReportComponent} from './report/new-report/new-report.component';
import {UserReportsComponent} from './report/user-reports/user-reports.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item/new', component: ItemNewComponent },
  { path: 'item/:id', component: ItemDetailsComponent },
  { path: 'users', component: UserProfilesListComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'location/new', component: NewLocationComponent },
  { path: 'location/:id', component: LocationDetailsComponent },
  { path: 'reservation/new', component: ReservationNewComponent },
  { path: 'reservation/:id', component: RequestDetailsComponent },
  { path: 'my/reservations', component: ReservationsComponent },
  { path: 'checkout/new', component: CheckOutNewComponent },
  { path: 'my/checkout', component: CheckOutComponent },
  { path: 'report/new', component: NewReportComponent },
  { path: 'reports/my', component: UserReportsComponent },
  { path: 'profile/:id', component: UserProfileComponent },
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
