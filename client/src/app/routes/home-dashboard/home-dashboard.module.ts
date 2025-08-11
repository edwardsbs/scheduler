import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeDashboardComponent } from './home-dashboard.component';
import { HomeDashboardRoutingModule } from './home-dashboard-routing.module';
import { HomeDashboardStore } from './home-dashboard.store';

@NgModule({
  declarations: [HomeDashboardComponent],
  imports: [
    CommonModule,
    HomeDashboardRoutingModule
  ],
  exports: [HomeDashboardComponent],
  providers: [HomeDashboardStore]
})
export class HomeDashboardModule { }
