import { TestBed } from '@angular/core/testing';

import { ExcelServicesService } from './excel-services.service';

describe('ExcelServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelServicesService = TestBed.get(ExcelServicesService);
    expect(service).toBeTruthy();
  });
});
