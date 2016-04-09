import { Injectable } from 'angular2/core';

import { ICustomer, IOrder } from '../interfaces';

@Injectable()
export class TrackerService {
  
  customerTrackBy(index:number, customer: ICustomer) {
    return customer.id;
  }
  
}