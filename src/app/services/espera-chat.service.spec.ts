import { TestBed } from '@angular/core/testing';

import { EsperaChatService } from './espera-chat.service';

describe('EsperaChatService', () => {
  let service: EsperaChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsperaChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
