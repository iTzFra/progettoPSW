import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AddProductDTO} from "../../../Model/DTO/ProductDTO/AddProductDTO";
import {ProductService} from "../../../Service/ProductService/product.service";

@Component({
  selector: 'app-addProduct',
  templateUrl: './AddProduct.component.html',
  styleUrls: ['./AddProduct.component.css']
})
export class AddProductComponent implements OnInit {
  form!: FormGroup

  isAddDisabled: boolean = false

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({productName: '', price: '', code: '', quantity: '', description: ''})
  }

  onSubmit(form: any): void {
    this.isAddDisabled = true
    let addProductDTO: AddProductDTO = new AddProductDTO
    addProductDTO.productName = form.value.productName
    addProductDTO.code = form.value.code
    addProductDTO.description = form.value.description
    addProductDTO.price = form.value.price
    addProductDTO.quantity = form.value.quantity
    this.productService.addProduct(addProductDTO).subscribe({
      next: response => {
        this.isAddDisabled = false
        alert('Aggiunto')
      },
      error: error => {
        this.isAddDisabled = false
        alert('Error')
      }
    })
  }
}
