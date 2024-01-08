import {Component, OnInit} from '@angular/core';
import {faArrowLeft, faArrowRight, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {ProductService} from "../../../Service/ProductService/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Product} from "../../../Model/Entity/Product";
import {UpdateProductDTO} from "../../../Model/DTO/ProductDTO/UpdateProductDTO";

@Component({
  selector: 'app-updateProduct',
  templateUrl: './UpdateProduct.component.html',
  styleUrls: ['./UpdateProduct.component.css']
})
export class UpdateProductComponent implements OnInit {
  iconArrowRight: IconDefinition = faArrowRight;

  iconArrowLeft: IconDefinition = faArrowLeft;

  products!: Product[]

  form!: FormGroup

  pageNumber!: number

  pageSize!: number

  form2Array: FormGroup[] = []

  isUpdateDisabled: boolean = false

  isSearchDisabled: boolean = false

  isRightButtonDisabled: boolean = false

  isProductsEmpty: boolean = false

  isLeftButtonDisabled: boolean = true

  productName!: string

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({productName: ''})
    this.productName = ''
    this.pageNumber = 0
    this.pageSize = 8
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
            this.form2Array = []
            this.products.forEach((product: Product, index: number) => {
              const formGroup = this.formBuilder.group({
                productName: [product.productName],
                price: [product.price],
                code: [product.code],
                quantity: [product.quantity],
                description: [product.description]
              })
              this.form2Array.push(formGroup)
            })
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
        }
        ,
        error: error => {
          alert('Error')
          this.isSearchDisabled = false
        }
      }
    )
    ;
  }

  showProductsByProductName(): void {
    this.isRightButtonDisabled = true
    this.isLeftButtonDisabled = true
    this.productService.showProductsByProductName(this.pageNumber, this.pageSize, "code", this.productName).subscribe(
      {
        next: response => {
          if (Array.isArray(response)) {
            this.products = response
            this.form2Array = []
            this.products.forEach((product: Product, index: number) => {
              const formGroup = this.formBuilder.group({
                productName: [product.productName],
                price: [product.price],
                code: [product.code],
                quantity: [product.quantity],
                description: [product.description]
              })
              this.form2Array.push(formGroup)
            })
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
        }
        ,
        error: error => {
          alert('Error')
          this.isSearchDisabled = false
        }
      }
    )
    ;
  }

  onSubmit(form: FormGroup):
    void {
    this.isSearchDisabled = true
    this.pageNumber = 0
    this.productName = form.value.productName
    if (this.productName != '') {
      this.showProductsByProductName()
    } else {
      this.showProducts()
    }
  }

  onSubmit2(form2: any, productId: number): void {
    this.isUpdateDisabled = true
    let updateProductDTO: UpdateProductDTO = new UpdateProductDTO
    updateProductDTO.description = form2.value.description
    updateProductDTO.productName = form2.value.productName
    updateProductDTO.price = form2.value.price
    updateProductDTO.id = productId
    updateProductDTO.quantity = form2.value.quantity
    this.productService.updateProduct(updateProductDTO).subscribe({
      next: response => {
        this.isUpdateDisabled = false
        alert('Modificato')
      },
      error: error => {
        alert('Error')
        this.isUpdateDisabled = false
      }
    })
  }
}

