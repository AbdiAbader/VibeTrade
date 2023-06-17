import { TestBed } from '@angular/core/testing';

import { ReviewserviceService } from './reviewservice.service';

describe('ReviewserviceService', () => {
  let service: ReviewserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
