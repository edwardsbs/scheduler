import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SidenavComponent } from './shared/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ 
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavComponent,
    ToastModule,
  ],
})
export class AppComponent {
  

  constructor( ) {}

   

}
