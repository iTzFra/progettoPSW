import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonOrderAdminComponent} from './PersonOrderAdmin.component';

describe('PersonOrderListAdminComponent', () => {
  let component: PersonOrderAdminComponent;
  let fixture: ComponentFixture<PersonOrderAdminComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonOrderAdminComponent]
    });
    fixture = TestBed.createComponent(PersonOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
