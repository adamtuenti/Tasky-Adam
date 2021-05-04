import { TestBed } from '@angular/core/testing';

import { MateriaSolicitudService } from './materia-solicitud.service';

describe('MateriaSolicitudService', () => {
  let service: MateriaSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
