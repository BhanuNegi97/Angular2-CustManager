import { Injectable } from '@angular/core';

import { ICustomer, IOrder } from '../interfaces';

@Injectable()
export class TrackByService {
  
  customerTrackBy(index:number, customer: ICustomer) {
    return customer.id;
  }
  
}