import { TestBed } from '@angular/core/testing';

import { CastserviceService } from './castservice.service';

describe('CastserviceService', () => {
  let service: CastserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CastserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
