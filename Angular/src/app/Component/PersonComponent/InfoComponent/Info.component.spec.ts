import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InfoComponent} from './Info.component';

describe('DataComponent', () => {
  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoComponent]
    });
    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
