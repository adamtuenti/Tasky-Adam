import { TestBed } from '@angular/core/testing';

import { GruposEstudiosService } from './grupos-estudios.service';

describe('GruposEstudiosService', () => {
  let service: GruposEstudiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposEstudiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
