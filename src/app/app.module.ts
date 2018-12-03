import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,

  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppService} from './shared/services/app.service';
import {UserService} from './shared/services/user.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthorizedDirective } from './shared/directives/authorized.directive';
import { UnauthorizedDirective } from './shared/directives/unauthorized.directive';
import { ItemsComponent } from './items/items.component';
import { ManagerDirective } from './shared/directives/manager.directive';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { SimpleDatePipe } from './shared/pipes/simple-date.pipe';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemNewComponent } from './items/item-new/item-new.component';
import { LocationComponent } from './location/location.component';
import { ItemDetailInfoComponent } from './items/item-details/item-detail-info/item-detail-info.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CommonModule} from '@angular/common';
import { ReservationsComponent } from './actions/reservations/reservations.component';
import { ReservationNewComponent } from './actions/reservations/reservation-new/reservation-new.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ReservationListDialogComponent} from './actions/reservations/reservation-new/reservations-dialog/reservation-list-dialog.component';
import {DatetimePipe} from './shared/pipes/datetime.pipe';
import { CheckOutComponent } from './actions/check-out/check-out.component';
import { CheckOutNewComponent } from './actions/check-out/check-out-new/check-out-new.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfilesListComponent } from './user-profile/user-profiles-list/user-profiles-list.component';
import { ActionDetailsComponent } from './actions/action-details/action-details.component';
import { LocationDetailsComponent } from './location/location-details/location-details.component';
import { NewLocationComponent } from './location/new-location/new-location.component';
import { ReportComponent } from './report/report.component';
import { NewReportComponent } from './report/new-report/new-report.component';
import { UserReportsComponent } from './report/user-reports/user-reports.component';
import { ReportDetailsComponent } from './report/report-details/report-details.component';
import {ConfirmDialog} from './shared/dialogs/confirm-dialog';
import {FinishReportDialog} from './report/report-details/dialog/finish-report-dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    AuthorizedDirective,
    UnauthorizedDirective,
    ItemsComponent,
    ManagerDirective,
    SimpleDatePipe,
    DatetimePipe,
    ItemDetailsComponent,
    ItemNewComponent,
    LocationComponent,
    ItemDetailInfoComponent,
    ReservationsComponent,
    ReservationNewComponent,
    ReservationListDialogComponent,
    CheckOutComponent,
    CheckOutNewComponent,
    UserProfileComponent,
    UserProfilesListComponent,
    ActionDetailsComponent,
    LocationDetailsComponent,
    NewLocationComponent,
    ReportComponent,
    NewReportComponent,
    UserReportsComponent,
    ReportDetailsComponent,
    ConfirmDialog,
    FinishReportDialog

  ],
  exports: [
    MatProgressSpinnerModule,
    ItemDetailsComponent,
    MatDialogModule
  ],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CommonModule,
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  entryComponents: [
    ReservationListDialogComponent,
    ConfirmDialog,
    FinishReportDialog
  ],

  providers: [AppService, UserService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

