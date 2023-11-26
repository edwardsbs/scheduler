import { Routes, RouterModule } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeDashboardComponent, 
},
{
    path: 'home-dashboard',
    component: HomeDashboardComponent, 
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeDashboardRoutingModule {}

