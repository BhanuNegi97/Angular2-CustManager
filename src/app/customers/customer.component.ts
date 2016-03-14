import { Component, OnInit } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { OrdersTableComponent } from '../orders/ordersTable.component';
import { ICustomer } from '../shared/interfaces';


@Component({ 
  selector: 'customer-orders', 
  providers: [DataService],
  templateUrl: 'app/customers/customer.component.html',
  directives: [CORE_DIRECTIVES, OrdersTableComponent]
})
export class CustomerComponent implements OnInit {

  customer: ICustomer;

  constructor(private dataService: DataService, private routeParams: RouteParams) { }
  
  ngOnInit() {
      const id = parseInt(this.routeParams.get('id'), 10);
      this.dataService.getCustomer(id)
          .subscribe((customer: ICustomer) => {
              this.customer = customer;
          });        
  }

}
