import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HolidaysModule } from './routes/days-off/holidays/holidays.module';
import { HomeDashboardModule } from './routes/home-dashboard/home-dashboard.module';
import { TimeTrackingModule } from './routes/time-tracking/time-tracking.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidenavModule } from './shared/sidenav/sidenav.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DaysOffModule } from './routes/days-off/days-off.module';
import { StoreModule } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { EffectsModule } from '@ngrx/effects';
import { TimeTrackingEffects } from './scheduler/data-access/store/time-tracking/time-tracking.effects';
import { schedulerReducers } from './scheduler/data-access/store/scheduler.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        SidenavModule,
        HolidaysModule,
        HomeDashboardModule,
        TimeTrackingModule,
        DaysOffModule,
        StoreModule.forRoot(schedulerReducers),
        // StoreModule.forRoot(notesReducers),  
        EffectsModule.forRoot([
            TimeTrackingEffects,
        ]),
        StoreDevtoolsModule.instrument({
            name: 'Scheduler',
            maxAge: 25,
        }),
        CardModule,
        TableModule,
        ButtonModule,
        StyleClassModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
