import {TestBed} from '@angular/core/testing';
import {PersonOrderService} from './person-order.service';

describe('PersonOrderService', () => {
  let service: PersonOrderService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonOrderService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
