import {Component, OnInit} from '@angular/core';
import {PersonOrderService} from "../../../Service/PersonOrderService/person-order.service";
import {ActivatedRoute} from "@angular/router";
import {ProductPersonOrder} from "../../../Model/Entity/ProductPersonOrder";

@Component({
  selector: 'app-productPersonOrder',
  templateUrl: './ProductPersonOrder.component.html',
  styleUrls: ['./ProductPersonOrder.component.css']
})
export class ProductPersonOrderComponent implements OnInit {
  productPersonOrders!: ProductPersonOrder[]

  constructor(private personOrderService: PersonOrderService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.personOrderService.showProductPersonOrdersByPerson(id).subscribe({
      next: response => {
        this.productPersonOrders = response
      },
      error: error => {
        alert('Error')
      }
    })
  }
}
