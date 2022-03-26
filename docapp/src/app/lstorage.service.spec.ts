import { TestBed } from '@angular/core/testing';

import { LstorageService } from './lstorage.service';

describe('LstorageService', () => {
  let service: LstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
