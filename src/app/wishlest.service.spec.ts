import { TestBed } from '@angular/core/testing';

import { WishlestService } from './wishlest.service';

describe('WishlestService', () => {
  let service: WishlestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
