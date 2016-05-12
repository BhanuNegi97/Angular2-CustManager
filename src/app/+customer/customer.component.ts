import { Component, OnInit } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, 
         RouteSegment, OnActivate, RouteTree } from '@angular/router';

import { CustomerDetailsComponent } from './customerDetails.component';
import { CustomerOrdersComponent } from './customerOrders.component';
import { CustomerEditComponent } from './customerEdit.component';

@Component({ 
  moduleId: module.id,
  selector: 'customer', 
  templateUrl: 'customer.component.html',
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path:'/orders',  component: CustomerOrdersComponent },
  {path:'/details', component: CustomerDetailsComponent },
  {path:'/edit', component: CustomerEditComponent }
])
export class CustomerComponent implements OnActivate {

  displayMode: CustomerDisplayModeEnum;
  displayModeEnum = CustomerDisplayModeEnum; 

  constructor() { }
  
  routerOnActivate(current: RouteSegment, prev?: RouteSegment,
    currTree?: RouteTree, prevTree?: RouteTree) {
    var path = currTree.children(current)[0].stringifiedUrlSegments;
    switch (path) {
      case 'details':
        this.displayMode = CustomerDisplayModeEnum.Details;
        break;
      case 'orders':
        this.displayMode = CustomerDisplayModeEnum.Orders;
        break;
      case 'edit':
        this.displayMode = CustomerDisplayModeEnum.Edit;
        break;
    }
  }

}

enum CustomerDisplayModeEnum {
  Details=0,
  Orders=1,
  Edit=2
}