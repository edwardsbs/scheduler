import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
        NgbModule,        
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        ButtonModule,
        SidebarModule,
        // HomeDashboardModule,
        // GridModule
        StyleClassModule,
  ]
})
export class SidenavComponent implements OnInit {

  title = 'Scheduler';
  
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  
  sidebarVisible: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches){
        this.sideNav.mode = 'over'
        this.sideNav.close();
      } else {
        this.sideNav.mode='side'
        this.sideNav.open();
      }
    })
  }

  public onSelect(ev: string): void {
    this.router.navigate(['./scheduler/' + ev]);
}

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }  

}
