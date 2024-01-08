import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonListComponent} from './Personcomponent';

describe('CardPersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonListComponent]
    });
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
