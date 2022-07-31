import { TestBed } from '@angular/core/testing';

import { AvalibalityService } from './avalibality.service';

describe('AvalibalityService', () => {
  let service: AvalibalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvalibalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
