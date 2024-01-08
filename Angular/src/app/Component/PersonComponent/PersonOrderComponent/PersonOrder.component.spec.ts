import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonOrderComponent} from './PersonOrder.component';

describe('CardPersonOrderListComponent', () => {
  let component: PersonOrderComponent;
  let fixture: ComponentFixture<PersonOrderComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonOrderComponent]
    });
    fixture = TestBed.createComponent(PersonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
