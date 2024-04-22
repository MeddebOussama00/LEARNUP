import { TestBed } from '@angular/core/testing';

import { AuthSeachService } from './auth-seach.service';

describe('AuthSeachService', () => {
  let service: AuthSeachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSeachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
