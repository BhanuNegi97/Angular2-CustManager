import { Component, Input} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Sorter } from '../shared/utils/sorter';
import { ICustomer } from '../shared/interfaces';

@Component({ 
  selector: 'orders-table',
  providers: [ Sorter ],
  templateUrl: 'app/orders/ordersTable.component.html',
  directives: [CORE_DIRECTIVES]
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
