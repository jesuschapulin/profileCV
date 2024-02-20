import { TestBed } from '@angular/core/testing';

import { ReaderResumenService } from './reader-resumen.service';

describe('ReaderResumenService', () => {
  let service: ReaderResumenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaderResumenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
