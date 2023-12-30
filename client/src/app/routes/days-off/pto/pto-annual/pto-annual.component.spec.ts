/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PtoAnnualComponent } from './pto-annual.component';

describe('PtoAnnualComponent', () => {
  let component: PtoAnnualComponent;
  let fixture: ComponentFixture<PtoAnnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtoAnnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtoAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
