/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssocHttpService } from './assoc-http.service';

describe('Service: AssocHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssocHttpService]
    });
  });

  it('should ...', inject([AssocHttpService], (service: AssocHttpService) => {
    expect(service).toBeTruthy();
  }));
});
