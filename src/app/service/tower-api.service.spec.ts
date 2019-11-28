import { TestBed } from '@angular/core/testing';

import { TowerAPIService } from './tower-api.service';

describe('TowerAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TowerAPIService = TestBed.get(TowerAPIService);
    expect(service).toBeTruthy();
  });
});
