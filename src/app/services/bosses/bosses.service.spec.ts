import { TestBed, inject } from '@angular/core/testing';

import { BossesService } from './bosses.service';

describe('BossesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BossesService]
    });
  });

  it('should be created', inject([BossesService], (service: BossesService) => {
    expect(service).toBeTruthy();
  }));
});
