import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UpdateProductComponent} from './UpdateProduct.component';

describe('UpdateProductListComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductComponent]
    });
    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
