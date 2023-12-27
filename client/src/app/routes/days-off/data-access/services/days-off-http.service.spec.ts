/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DaysOffHttpService } from './days-off-http.service';

describe('Service: DaysOffHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaysOffHttpService]
    });
  });

  it('should ...', inject([DaysOffHttpService], (service: DaysOffHttpService) => {
    expect(service).toBeTruthy();
  }));
});
