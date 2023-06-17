import { TestBed } from '@angular/core/testing';

import { NotifyserviceService } from './notifyservice.service';

describe('NotifyserviceService', () => {
  let service: NotifyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
