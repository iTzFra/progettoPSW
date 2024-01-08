import {Component} from '@angular/core';
import {PersonOrderService} from "../../../Service/PersonOrderService/person-order.service";
import {ActivatedRoute} from "@angular/router";
import {ProductPersonOrder} from "../../../Model/Entity/ProductPersonOrder";

@Component({
  selector: 'app-productPersonOrderAdmin',
  templateUrl: './ProductPersonOrderAdmin.component.html',
  styleUrls: ['./ProductPersonOrderAdmin.component.css']
})
export class ProductPersonOrderAdminComponent {
  productPersonOrders!: ProductPersonOrder[]

  constructor(private personOrderService: PersonOrderService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id1: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id1')!);
    const id2: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id2')!);
    this.personOrderService.showProductPersonOrders(id1, id2).subscribe({
      next: response => {
        this.productPersonOrders = response
      },
      error: error => {
        alert('Error')
      }
    })
  }
}
