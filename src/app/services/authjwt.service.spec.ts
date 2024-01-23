import { TestBed } from '@angular/core/testing';

import { AuthjwtService } from './authjwt.service';

describe('AuthjwtService', () => {
  let service: AuthjwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthjwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
