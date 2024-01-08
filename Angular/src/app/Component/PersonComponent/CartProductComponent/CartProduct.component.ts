import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../Service/CartService/cart.service";
import {PersonOrderService} from "../../../Service/PersonOrderService/person-order.service";
import {CartProduct} from "../../../Model/Entity/CartProduct";
import {Cart} from "../../../Model/Entity/Cart";
import {UpdateCartProduct} from "../../../Model/DTO/CartProductDTO/UpdateCartProduct";

@Component({
  selector: 'app-cartProduct',
  templateUrl: './CartProduct.component.html',
  styleUrls: ['./CartProduct.component.css']
})
export class CartProductComponent implements OnInit {
  cartProducts!: CartProduct[]

  cart!: Cart

  isDeleteDisabled: boolean = false

  isCartEmpty: boolean = false

  isOrderDisabled: boolean = false

  isQuantityDisabled: boolean = false

  constructor(private cartService: CartService, private personOrder: PersonOrderService) {
  }

  ngOnInit(): void {
    this.isCartEmpty = true
    this.change()
  }

  onOrder(): void {
    this.isOrderDisabled = true
    this.personOrder.addPersonOrder().subscribe({
      next: response => {
        this.change()
        this.isOrderDisabled = false
      },
      error: error => {
        alert('Error')
        this.isOrderDisabled = false
      }
    })
  }

  change(): void {
    this.cartService.getCart().subscribe({
      next: response => {
        if ('message' in response) {
          this.cartProducts = []
          this.isCartEmpty = true
        } else {
          this.cart = response
          this.cartService.showCartProducts().subscribe({
            next: response => {
              this.cartProducts = response
              this.isCartEmpty = false
            },
            error: error => {
              alert('Error')
            }
          })
        }
      },
      error: error => {
        alert('Error')
      }
    })
  }

  onQuantity(cartProductId: number, quantity: any): void {
    let updateCartProduct: UpdateCartProduct = new UpdateCartProduct()
    updateCartProduct.id = cartProductId
    updateCartProduct.quantity = quantity
    this.isQuantityDisabled = true
    this.cartService.updateCartProduct(updateCartProduct).subscribe({
        next: response => {
          this.change()
          this.isQuantityDisabled = false
        },
        error: error => {
          this.isQuantityDisabled = false
          alert('Error')
        }
      }
    );
  }

  onDelete(id: number): void {
    this.isDeleteDisabled = true
    this.cartService.deleteCartProduct(id).subscribe({
      next: response => {
        this.change()
        this.isDeleteDisabled = false
      },
      error: error => {
        this.isDeleteDisabled = false
        alert('Error')
      }
    })
  }
}
