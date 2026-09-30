import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { doctorguardGuard } from './doctorguard-guard';

describe('doctorguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => doctorguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
