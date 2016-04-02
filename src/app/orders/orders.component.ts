import { Component } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';

import { DataService } from '../shared/services/data.service';
import { IPagedResults, ICustomer, IOrder } from '../shared/interfaces';
import { OrdersTableComponent } from './ordersTable.component';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({ 
  selector: 'orders',
  templateUrl: 'app/orders/orders.component.html',
  directives: [RouterLink, OrdersTableComponent, 
               FilterTextboxComponent, PaginationComponent]
})
export class OrdersComponent {
	
	title: string = 'Orders';
  customers: any[] = [];
  filteredCustomers: any[] = [];
  customerId: number;
  
  totalRecords: number = 0;
  pageSize: number = 5;
  
  constructor(private dataService: DataService, 
              private routeParams: RouteParams) {
    
  }
  
  ngOnInit() {
      this.customerId = parseInt(this.routeParams.get('id'), 10);
      this.getCustomers(1);
  }
  
  getCustomers(page: number) {
      this.dataService.getCustomers(page - 1, this.pageSize)
          .subscribe((response: IPagedResults) => {
            this.customers = this.filteredCustomers = response.results;
            this.totalRecords = response.totalRecords;
        });
  }
  
  pageChanged(page: number) {
    this.getCustomers(page);
  }
  
  filterChanged(filterData: string) {
      filterData = filterData.toLowerCase();
      
      //Quick/dirty way to deep clone
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
