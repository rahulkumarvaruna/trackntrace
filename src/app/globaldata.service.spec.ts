import { TestBed } from '@angular/core/testing';

import { GlobaldataService } from './globaldata.service';

describe('GlobaldataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobaldataService = TestBed.get(GlobaldataService);
    expect(service).toBeTruthy();
  });
});
