import { Routes } from '@angular/router';
import { TimeTrackingComponent } from './routes/time-tracking/time-tracking.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home-dashboard', pathMatch: 'full'}, 
  {
    path: 'home-dashboard',
    loadChildren: () => import('./routes/home-dashboard/home-dashboard.module').then(m => m.HomeDashboardModule) 
  },     
  {
    path: 'time-tracking',
        // canActivate: [AllRoutesGuard],
        component: TimeTrackingComponent,
        title: 'Time Tracking',
        children: [
            // {
            //     path: 'applications',
            //     // canActivate: [AllRoutesGuard],
            //     component: DayHeaderComponent,
            //     title: 'Applications' 
            // },
        ],
    // path: 'time-tracking',
    // loadChildren: () => import('./routes/time-tracking/time-tracking.module').then(m => m.TimeTrackingModule) 
  },      
  {
    path: 'days-off',
    loadChildren: () => import('./routes/days-off/days-off.module').then(m => m.DaysOffModule)
  }
]