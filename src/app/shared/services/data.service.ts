import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { IPagedResults, ICustomer, ICustomerSummary } from '../interfaces.ts';
import { LogService } from './log.service';
import { HttpUtils } from '../utils/httpUtils';

@Injectable()
export class DataService {
  
    _apiEndpoint: string = '/api/dataservice/';
  
    constructor(private _http: Http, private _httpUtils: HttpUtils, private _logService: LogService) {

    }
    
    getCustomers(pageIndex: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.getPagedResource('customers', pageIndex, pageSize);
    }
    
    getCustomersSummary(pageIndex: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
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

    getOrders(pageIndex: number, pageSize: number) : Observable<IPagedResults<ICustomerSummary[]>>{
        return this.getPagedResource('customersSummary', pageIndex, pageSize);               
    }
    
    getStates() {
      return this._http.get(this._apiEndpoint + 'states')
                 .map((res: Response) => {
                     return res.json();
                 })
                 .catch(this.handleError);
    }

    getPagedResource(baseResource: string, pageIndex: number, pageSize: number)  {
        let resource = baseResource;
        resource += (arguments.length === 3) ? this.buildPagingUri(pageIndex, pageSize) : '';
        return this._http.get(this._apiEndpoint + resource)
                .map((response: Response) => {
                    let custs = response.json();
                    this.extendCustomers(custs);
                    return {
                        totalRecords: +response.headers.get('X-InlineCount'),
                        results: custs
                    };
                })
                .catch(this.handleError);   
    }

    buildPagingUri(pageIndex: number, pageSize: number) {
        const uri = '?$top=' + pageSize + '&$skip=' + (pageIndex * pageSize);
        return uri;
    }
    
    insertCustomer(customer: ICustomer) : Observable<number> {
      return this._http.post(this._apiEndpoint + 'postCustomer', 
                             JSON.stringify(customer), this._httpUtils.getJsonRequestOptions())
                 .map((response: Response) => {
                   return +response.json();
                 })
                 .catch(this.handleError);
      
    }
    
    updateCustomer(customer: ICustomer) {
      return this._http.put(this._apiEndpoint + 'putCustomer/' + customer.id, 
                            JSON.stringify(customer), this._httpUtils.getJsonRequestOptions())
                 .map((response: Response) => {
                   return response.json();
                 });
    }
    
    deleteCustomer(id: number) {
      return this._http.delete(this._apiEndpoint + 'deleteCustomer/' + id, this._httpUtils.getJsonRequestOptions())
                 .map((response: Response) => {
                   return response.json();
                 })
                 .catch(this.handleError);
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