import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductPersonOrderComponent} from './ProductPersonOrder.component';

describe('CardProductPersonOrderListComponent', () => {
  let component: ProductPersonOrderComponent;
  let fixture: ComponentFixture<ProductPersonOrderComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPersonOrderComponent]
    });
    fixture = TestBed.createComponent(ProductPersonOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
