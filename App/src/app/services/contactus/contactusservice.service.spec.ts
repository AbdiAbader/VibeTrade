import { TestBed } from '@angular/core/testing';

import { ContactusserviceService } from './contactusservice.service';

describe('ContactusserviceService', () => {
  let service: ContactusserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactusserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
