import { TestBed } from '@angular/core/testing';

import { CalificacionesVeterinariosService } from './calificaciones-veterinarios.service';

describe('CalificacionesVeterinariosService', () => {
  let service: CalificacionesVeterinariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionesVeterinariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
