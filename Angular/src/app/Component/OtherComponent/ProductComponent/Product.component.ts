import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../Service/ProductService/product.service";
import {faArrowLeft, faArrowRight, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../../../Model/Entity/Product";
import {AddCartProductDTO} from "../../../Model/DTO/CartProductDTO/AddCartProductDTO";
import {CartService} from "../../../Service/CartService/cart.service";
import {AuthService} from "../../../Service/AuthService/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css']
})
export class ProductComponent implements OnInit {
  products!: Product[]

  form!: FormGroup

  pageNumber!: number

  pageSize!: number

  isAddDisabled: boolean = false

  isSearchDisabled: boolean = false

  iconArrowRight: IconDefinition = faArrowRight;

  iconArrowLeft: IconDefinition = faArrowLeft;

  productName!: string

  isRightButtonDisabled: boolean = false

  isProductsEmpty: boolean = false

  isLeftButtonDisabled: boolean = true

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private cartService: CartService, private authService: AuthService, private router: Router) {
  }

  onAdd(id: number, quantity: any): void {
    this.isAddDisabled = true
    if (this.authService.isAdminLogged()) {
      this.router.navigate(['/adminPage'])
    } else if (!this.authService.isPersonLogged()) {
      this.router.navigate(['/login'])
    } else {
      let addCartProductDTO: AddCartProductDTO = new AddCartProductDTO()
      addCartProductDTO.productId = id
      addCartProductDTO.quantity = quantity
      this.cartService.addCartProduct(addCartProductDTO).subscribe({
          next: response => {
            this.isAddDisabled = false
            alert('Prodotto aggiunto')
          },
          error: error => {
            alert('Error')
            this.isAddDisabled = false
          }
        }
      );
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({productName: ''})
    this.productName = ''
    this.pageNumber = 0
    this.pageSize = 6
    this.showProducts()
  }

  onArrowRight(): void {
    this.pageNumber++
    if (this.productName != '') {
      this.showProductsByProductName()
    } else {
      this.showProducts()
    }
  }

  onArrowLeft(): void {
    this.pageNumber--
    if (this.productName != '') {
      this.showProductsByProductName()
    } else {
      this.showProducts()
    }
  }

  showProducts(): void {
    this.isRightButtonDisabled = true
    this.isLeftButtonDisabled = true
    this.productService.showProducts(this.pageNumber, this.pageSize, 'code').subscribe(
      {
        next: response => {
          if (Array.isArray(response)) {
            this.products = response
            this.isProductsEmpty = false
            this.isRightButtonDisabled = false
            if (this.pageNumber === 0) {
              this.isLeftButtonDisabled = true
            } else {
              this.isLeftButtonDisabled = false
            }
          } else {
            this.isProductsEmpty = true
            this.isRightButtonDisabled = true
            this.products = []
            this.isLeftButtonDisabled = false
          }
          this.isSearchDisabled = false
        },
        error: error => {
          alert('Error')
          this.isSearchDisabled = false
        }
      }
    );
  }

  showProductsByProductName(): void {
    this.isRightButtonDisabled = true
    this.isLeftButtonDisabled = true
    this.productService.showProductsByProductName(this.pageNumber, this.pageSize, 'code', this.productName).subscribe(
      {
        next: response => {
          if (Array.isArray(response)) {
            this.products = response
            this.isProductsEmpty = false
            this.isRightButtonDisabled = false
            if (this.pageNumber === 0) {
              this.isLeftButtonDisabled = true
            } else {
              this.isLeftButtonDisabled = false
            }
          } else {
            this.isProductsEmpty = true
            this.products = []
            if (this.pageNumber === 0) {
              this.isLeftButtonDisabled = true
            } else {
              this.isLeftButtonDisabled = false
            }
            this.isRightButtonDisabled = true
          }
          this.isSearchDisabled = false
        },
        error: error => {
          alert('Error')
          this.isSearchDisabled = false
        }
      }
    );
  }

  onSubmit(form: FormGroup): void {
    this.isSearchDisabled = true
    this.pageNumber = 0
    this.productName = form.value.productName
    if (this.productName != '') {
      this.showProductsByProductName()
    } else {
      this.showProducts()
    }
  }
}
