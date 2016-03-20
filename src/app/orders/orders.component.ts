import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { RouterLink, RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { IPagedResults, ICustomer, IOrder } from '../shared/interfaces';
import { OrdersTableComponent } from './ordersTable.component';
import { FilterTextboxComponent } from '../shared/components/filterTextbox.component';

@Component({ 
  selector: 'orders',
  templateUrl: 'app/orders/orders.component.html',
  directives: [CORE_DIRECTIVES, RouterLink, OrdersTableComponent, FilterTextboxComponent]
})
export class OrdersComponent {
	
	title: string = 'Orders';
    customers: any[] = [];
    filteredCustomers: any[] = [];
  
    constructor(private dataService: DataService, 
                private routeParams: RouteParams) {
      
    }
    
    ngOnInit() {
        const customerId = parseInt(this.routeParams.get('id'), 10);
        this.dataService.getCustomers(1, 10).subscribe((response: IPagedResults) => {
            this.customers = this.filteredCustomers = response.results;
        });
    }
    
    filterChanged(filterData: string) {
        filterData = filterData.toLowerCase();
        
        //Quick way to deep clone
        this.filteredCustomers = JSON.parse(JSON.stringify(this.customers));
        
        this.filteredCustomers = this.filteredCustomers.filter((cust: ICustomer) => {
          if (cust.orders) {
              cust.orders = cust.orders.filter((order: IOrder) => {
                  return order.product.toLowerCase().indexOf(filterData) > -1;
              });
              return cust.orders && cust.orders.length > 0;
          }
          else {
            return false;
          }
        });
    }
}
