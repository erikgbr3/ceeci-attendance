import { TestBed } from '@angular/core/testing';

import { AttendandeService } from './attendande.service';

describe('AttendandeService', () => {
  let service: AttendandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
