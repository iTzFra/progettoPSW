import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonPageComponent} from './PersonPage.component';

describe('AccountComponent', () => {
  let component: PersonPageComponent;
  let fixture: ComponentFixture<PersonPageComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonPageComponent]
    });
    fixture = TestBed.createComponent(PersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
