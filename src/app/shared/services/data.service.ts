import { Injectable, Inject } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { IPagedResults, ICustomer } from '../interfaces.ts';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { LogService } from '../services/log.service';

@Injectable()
export class DataService {
  
    _apiEndpoint: string = '/api/dataservice/';
  
    constructor(private _http: Http, private _logService: LogService) {

    }
    
    getCustomers(pageIndex: number, pageSize: number) : Observable<IPagedResults> {
        return this.getPagedResource('customers', pageIndex, pageSize);
    }
    
    getCustomersSummary(pageIndex: number, pageSize: number) {
        return this.getPagedResource('customersSummary', pageIndex, pageSize);
    }
    
    getCustomer(id: number) : Observable<ICustomer> {
        return this._http.get(this._apiEndpoint + 'customerById/' + id)
                   .map((res: Response) => {
                       let customer = res.json();
                       this.extendCustomers([customer]);
                       return customer;
                   })
                   .catch(this.handleError);
    }

    getOrders(pageIndex: number, pageSize: number) {
        return this.getPagedResource('customersSummary', pageIndex, pageSize);               
    }
    
    getStates() {
      return this._http.get(this._apiEndpoint + 'states')
                 .map((res: Response) => {
                     return res.json();
                 })
                 .catch(this.handleError);
    }

    getPagedResource(baseResource: string, pageIndex: number, pageSize: number) : Observable<IPagedResults> {
        let resource = baseResource;
        resource += (arguments.length === 3) ? this.buildPagingUri(pageIndex, pageSize) : '';
        return this._http.get(this._apiEndpoint + resource)
                .map((response: Response) => {
                    let custs = response.json();
                    this.extendCustomers(custs);
                    return {
                        totalRecords: parseInt(response.headers.get('X-InlineCount'), 10),
                        results: custs
                    };
                })
                .catch(this.handleError);   
    }

    buildPagingUri(pageIndex: number, pageSize: number) {
        const uri = '?$top=' + pageSize + '&$skip=' + (pageIndex * pageSize);
        return uri;
    }
    
    extendCustomers(customers: ICustomer[]) {
        const custsLen = customers.length;
        //Iterate through customers
        for (let i = 0; i < custsLen; i++) {
            const cust = customers[i];
            if (!cust.orders) continue;

            const ordersLen = cust.orders.length;
            for (let j = 0; j < ordersLen; j++) {
                const order = cust.orders[j];
                order.orderTotal = order.quantity * order.price;
            }
            cust.ordersTotal = this.ordersTotal(cust);
        }
    }
    
    ordersTotal(customer: ICustomer) {
        let total = 0;
        const orders = customer.orders;
        const count = orders.length;

        for (let i = 0; i < count; i++) {
            total += orders[i].orderTotal;
        }
        return total;
    };
    
    handleError(error: any) {
        this._logService.log('Error: ' + error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
