import { TestBed } from '@angular/core/testing';

import { MyauthguardGuard } from './myauthguard.guard';

describe('MyauthguardGuard', () => {
  let guard: MyauthguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyauthguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
