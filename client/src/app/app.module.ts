import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HolidaysModule } from './routes/days-off/holidays/holidays.module';
import { HomeDashboardModule } from './routes/home-dashboard/home-dashboard.module';
import { TimeTrackingModule } from './routes/time-tracking/time-tracking.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidenavModule } from './shared/sidenav/sidenav.module';
import { HttpClientModule } from '@angular/common/http';
import { DaysOffModule } from './routes/days-off/days-off.module';
import { StoreModule } from '@ngrx/store';
import { daysOffReducer } from './routes/days-off/data-access/store/days-off.reducer';

@NgModule({
  declarations: [	
    AppComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SidenavModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HolidaysModule,
    HomeDashboardModule,
    TimeTrackingModule,
    DaysOffModule,
    HttpClientModule,
    StoreModule.forRoot({ dasyOff: daysOffReducer }, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
