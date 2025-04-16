import { TestBed } from '@angular/core/testing';

import { Open5eService } from './open5e.service';

describe('Open5eService', () => {
  let service: Open5eService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Open5eService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
