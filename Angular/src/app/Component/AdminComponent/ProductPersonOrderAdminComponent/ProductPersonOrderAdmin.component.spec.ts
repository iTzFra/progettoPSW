import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ProductPersonOrderAdminComponent} from './ProductPersonOrderAdmin.component';

describe('ProductPersonOrderListAdminComponent', () => {
  let component: ProductPersonOrderAdminComponent;
  let fixture: ComponentFixture<ProductPersonOrderAdminComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPersonOrderAdminComponent]
    });
    fixture = TestBed.createComponent(ProductPersonOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
