import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { Router, RouterLink, RouteParams } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { OrdersTableComponent } from '../orders/ordersTable.component'; 
import { IUserSecurity, ICustomer } from '../shared/interfaces';

@Component({
  moduleId: __moduleName,
  selector: 'customer-orders',
  templateUrl: 'customerOrders.component.html',
  directives: [RouterLink, OrdersTableComponent]
})
export class CustomerOrdersComponent implements OnInit {
  
  user: IUserSecurity;
  customer: ICustomer;

  constructor(private dataService: DataService, 
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() { 
    this.user = this.authService.user;
  
    //Get route parameter (id) from parent router (root)
    let instruction = this.router.root.currentInstruction;
    const id = +instruction.component.params['id'];
    
    this.dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
            this.customer = customer;
        });  
  }

}