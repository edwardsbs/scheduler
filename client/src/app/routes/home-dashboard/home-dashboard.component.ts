import { Component, OnInit } from '@angular/core';
import { HomeDashboardStore } from './home-dashboard.store';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {

  associates$ = this.compStore.associates$

  constructor(
    private readonly compStore: HomeDashboardStore
  ) { }


}
