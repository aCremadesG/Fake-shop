import { TestBed } from '@angular/core/testing';

import { FilesService } from './files.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
