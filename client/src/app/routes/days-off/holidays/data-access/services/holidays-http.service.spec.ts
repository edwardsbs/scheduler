/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HolidaysHttpService } from './holidays-http.service';

describe('Service: HolidaysHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HolidaysHttpService]
    });
  });

  it('should ...', inject([HolidaysHttpService], (service: HolidaysHttpService) => {
    expect(service).toBeTruthy();
  }));
});
