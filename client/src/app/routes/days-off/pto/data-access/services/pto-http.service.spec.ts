/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PtoHttpService } from './pto-http.service';

describe('Service: PtoHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PtoHttpService]
    });
  });

  it('should ...', inject([PtoHttpService], (service: PtoHttpService) => {
    expect(service).toBeTruthy();
  }));
});
