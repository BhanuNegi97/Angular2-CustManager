import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES,
         RouteSegment, OnActivate, RouteTree } from '@angular/router';

import { DataService } from '../shared/services/data.service';
import { AuthService } from '../shared/services/auth.service';
import { OrdersTableComponent } from '../orders/ordersTable.component'; 
import { IUserSecurity, ICustomer } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'customer-orders',
  templateUrl: 'customerOrders.component.html',
  directives: [ROUTER_DIRECTIVES, OrdersTableComponent]
})
export class CustomerOrdersComponent implements OnActivate {
  
  user: IUserSecurity;
  customer: ICustomer;

  constructor(private dataService: DataService, 
              private authService: AuthService) { }
              
  routerOnActivate(current: RouteSegment, prev?: RouteSegment,
    currTree?: RouteTree, prevTree?: RouteTree) {
      
    this.user = this.authService.user;
      
    const id = +currTree.parent(current).getParam('id');
    this.dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
            this.customer = customer;
        });   
     
  }

}