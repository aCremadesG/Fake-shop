import { TestBed } from '@angular/core/testing';

import { AuthjwtService } from './authjwt.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthjwtService', () => {
  let service: AuthjwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthjwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
