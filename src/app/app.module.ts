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
import { DateFormat } from './date-format';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { LocationComponent } from './location/location.component';
import { ItemDetailInfoComponent } from './items/item-details/item-detail-info/item-detail-info.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FlatpickrModule} from 'angularx-flatpickr';
import {DemoUtilsModule} from './items/demo-utils/module';
import {CommonModule} from '@angular/common';
import { ReservationsComponent } from './reservations/reservations.component';
import {ReservationsService} from './reservations/reservations.service';
import { ReservationNewComponent } from './reservations/reservation-new/reservation-new.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ReservationListDialogComponent} from './reservations/reservation-new/reservations-dialog/reservation-list-dialog.component';
import {DatetimePipe} from './shared/pipes/datetime.pipe';


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
    ReservationListDialogComponent
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
    AppRoutingModule,
    DemoUtilsModule
  ],
  entryComponents: [
    ReservationListDialogComponent
  ],

  providers: [AppService, UserService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
