import { TestBed } from '@angular/core/testing';

import { LauncherService } from './launcher.service';

describe('LauncherServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LauncherService = TestBed.get(LauncherServiceService);
    expect(service).toBeTruthy();
  });
});
