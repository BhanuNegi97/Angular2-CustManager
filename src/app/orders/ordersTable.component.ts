import { Component, Input} from 'angular2/core';
import { Sorter } from '../shared/utils/sorter';
import { ICustomer } from '../shared/interfaces';

@Component({ 
  selector: 'orders-table',
  providers: [ Sorter ],
  templateUrl: 'app/orders/ordersTable.component.html'
})
export class OrdersTableComponent {
	
    @Input() customer: ICustomer;
  
    constructor(private sorter: Sorter) {}
    
    ngOnInit() {

    }
    
    filterChanged(data: string) {

    }
    
    sort(prop: string) {
      this.sorter.sort(this.customer.orders, prop);
  }
}
