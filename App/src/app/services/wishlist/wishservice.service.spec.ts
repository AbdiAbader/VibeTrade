import { TestBed } from '@angular/core/testing';

import { WishserviceService } from './wishservice.service';

describe('WishserviceService', () => {
  let service: WishserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
