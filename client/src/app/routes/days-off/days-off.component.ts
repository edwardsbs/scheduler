import { Component, OnInit } from '@angular/core';
import { DaysOffStore } from './days-off.store';
import { Year } from './data-access/models';

@Component({
  selector: 'app-days-off',
  templateUrl: './days-off.component.html',
  styleUrls: ['./days-off.component.scss']
})
export class DaysOffComponent implements OnInit {

  years$ = this.store.years$;
  year: Year = { yearNumber: 2022 } // = this.store.selectedYear$;
  
  constructor(
    private readonly store: DaysOffStore
  ) { }

  ngOnInit() {
    // this.year = { yearNumber: 2023 }
  }

  yearSelectionChange(event: any) {
    console.log('year', event.option)
    this.store.setSelectedYear(event.option.yearNumber);
  }

}
