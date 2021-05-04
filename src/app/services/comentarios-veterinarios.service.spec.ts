import { TestBed } from '@angular/core/testing';

import { ComentariosVeterinariosService } from './comentarios-veterinarios.service';

describe('ComentariosVeterinariosService', () => {
  let service: ComentariosVeterinariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentariosVeterinariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
