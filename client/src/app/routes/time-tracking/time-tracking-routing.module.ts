import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeTrackingComponent } from './time-tracking.component';

const routes: Routes = [  
    {
        path: '',
        component: TimeTrackingComponent, 
    },
    {
        path: 'time-tracking',
        component: TimeTrackingComponent, 
     }
   ] ;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TimeTrackingRoutingModule {}