import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Sorter } from '../shared/utils/sorter';
import { ICustomer } from '../shared/interfaces';

@Component({ 
  moduleId: module.id,
  selector: 'orders-table',
  providers: [ Sorter ],
  templateUrl: 'ordersTable.component.html',
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
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
