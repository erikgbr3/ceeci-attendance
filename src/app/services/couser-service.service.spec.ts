import { TestBed } from '@angular/core/testing';

import { CouserServiceService } from './couser-service.service';

describe('CouserServiceService', () => {
  let service: CouserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
