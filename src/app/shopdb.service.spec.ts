import { TestBed } from '@angular/core/testing';

import { ShopdbService } from './shopdb.service';

describe('ShopdbService', () => {
  let service: ShopdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
