import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', redirectTo: '/home-dashboard', pathMatch: 'full'}, 
  {
    path: 'home-dashboard',
    loadChildren: () => import('./routes/home-dashboard/home-dashboard.module').then(m => m.HomeDashboardModule) 
  },     
  {
    path: 'time-tracking',
    loadChildren: () => import('./routes/time-tracking/time-tracking.module').then(m => m.TimeTrackingModule) 
  },      
  {
    path: 'days-off',
    loadChildren: () => import('./routes/days-off/days-off.module').then(m => m.DaysOffModule)
  },

  
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
