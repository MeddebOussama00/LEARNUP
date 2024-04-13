import { TestBed } from '@angular/core/testing';

import { ReportSharedService } from './report-shared.service';

describe('ReportSharedService', () => {
  let service: ReportSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
