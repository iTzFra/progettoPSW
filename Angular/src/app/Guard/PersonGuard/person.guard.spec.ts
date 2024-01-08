import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';
import {personGuard} from './person.guard';

describe('personGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => personGuard(...guardParameters));
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });
  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
