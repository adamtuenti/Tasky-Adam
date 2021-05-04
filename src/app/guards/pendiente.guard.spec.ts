import { TestBed } from '@angular/core/testing';

import { PendienteGuard } from './pendiente.guard';

describe('PendienteGuard', () => {
  let guard: PendienteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PendienteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
