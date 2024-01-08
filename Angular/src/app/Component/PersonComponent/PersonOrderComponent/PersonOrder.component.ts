import {Component, OnInit} from '@angular/core';
import {PersonOrderService} from "../../../Service/PersonOrderService/person-order.service";
import {PersonOrder} from "../../../Model/Entity/PersonOrder";

@Component({
  selector: 'app-personOrder',
  templateUrl: './PersonOrder.component.html',
  styleUrls: ['./PersonOrder.component.css']
})
export class PersonOrderComponent implements OnInit {
  personOrders!: PersonOrder[]

  isPersonOrdersEmpty: boolean = false

  constructor(private personOrderService: PersonOrderService) {
  }

  ngOnInit(): void {
    this.personOrderService.showPersonOrders().subscribe({
      next: response => {
        if ('message' in response) {
          this.isPersonOrdersEmpty = true
        } else {
          this.personOrders = response
        }
      },
      error: error => {
        alert('Error')
      }
    })
  }
}
