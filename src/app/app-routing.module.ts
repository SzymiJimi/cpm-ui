import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ItemsComponent} from './items/items.component';
import {ItemDetailsComponent} from './items/item-details/item-details.component';
import {ItemNewComponent} from './items/item-new/item-new.component';
import {ReservationsComponent} from './actions/reservations/reservations.component';
import {ReservationNewComponent} from './actions/reservations/reservation-new/reservation-new.component';
import {CheckOutComponent} from './actions/check-out/check-out.component';
import {CheckOutNewComponent} from './actions/check-out/check-out-new/check-out-new.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserProfilesListComponent} from './user-profile/user-profiles-list/user-profiles-list.component';
import {ActionDetailsComponent} from './actions/action-details/action-details.component';
import {LocationComponent} from './location/location.component';
import {LocationDetailsComponent} from './location/location-details/location-details.component';
import {NewLocationComponent} from './location/new-location/new-location.component';
import {NewReportComponent} from './report/new-report/new-report.component';
import {UserReportsComponent} from './report/user-reports/user-reports.component';
import {ReportDetailsComponent} from './report/report-details/report-details.component';
import {NewStocktakingComponent} from './stocktaking/new-stocktaking/new-stocktaking.component';
import {StocktakingComponent} from './stocktaking/stocktaking.component';
import {StartedStocktakingComponent} from './stocktaking/started-stocktaking/started-stocktaking.component';
import {ReportComponent} from './report/report.component';
import {RegistrationComponent} from './login/registration/registration.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'item/new', component: ItemNewComponent },
  { path: 'item/:id', component: ItemDetailsComponent },
  { path: 'users', component: UserProfilesListComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'location/new', component: NewLocationComponent },
  { path: 'location/:id', component: LocationDetailsComponent },
  { path: 'reservation/new', component: ReservationNewComponent },
  { path: 'reservation/:id', component: ActionDetailsComponent },
  { path: 'my/reservations', component: ReservationsComponent },
  { path: 'checkout/new', component: CheckOutNewComponent },
  { path: 'my/checkout', component: CheckOutComponent },
  { path: 'report/new', component: NewReportComponent },
  { path: 'reports/my', component: UserReportsComponent },
  { path: 'reports', component: ReportComponent },
  { path: 'report/:id', component: ReportDetailsComponent },
  { path: 'stocktaking/new', component: NewStocktakingComponent },
  { path: 'stocktaking/location', component: StocktakingComponent },
  { path: 'stocktaking/started/:id', component: StartedStocktakingComponent },

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
