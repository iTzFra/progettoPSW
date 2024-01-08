import {Component, OnInit} from '@angular/core';
import {PersonOrderService} from "../../../Service/PersonOrderService/person-order.service";
import {ActivatedRoute} from "@angular/router";
import {PersonOrder} from "../../../Model/Entity/PersonOrder";

@Component({
  selector: 'app-personOrderAdmin',
  templateUrl: './PersonOrderAdmin.component.html',
  styleUrls: ['./PersonOrderAdmin.component.css']
})
export class PersonOrderAdminComponent implements OnInit {
  personOrders!: PersonOrder[]

  isPersonOrdersEmpty: boolean = false

  personId!: number

  constructor(private personOrderService: PersonOrderService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.personId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.personOrderService.showPersonOrdersByPerson(this.personId).subscribe({
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
