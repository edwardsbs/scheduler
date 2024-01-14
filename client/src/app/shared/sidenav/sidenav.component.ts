import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Sidebar } from 'primeng/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
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
