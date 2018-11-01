import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  DateAdapter,
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
    ItemDetailsComponent,
    ItemNewComponent,
    LocationComponent,
    ItemDetailInfoComponent
  ],
  exports: [
    MatProgressSpinnerModule
  ],
  imports: [
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
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],

  providers: [AppService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter:DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }

}

platformBrowserDynamic().bootstrapModule(AppModule);
