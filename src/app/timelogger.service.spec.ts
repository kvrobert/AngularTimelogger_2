import { TestBed, inject } from '@angular/core/testing';

import { TimeloggerService } from './timelogger.service';

describe('TimeloggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeloggerService]
    });
  });

  it('should be created', inject([TimeloggerService], (service: TimeloggerService) => {
    expect(service).toBeTruthy();
  }));
});
