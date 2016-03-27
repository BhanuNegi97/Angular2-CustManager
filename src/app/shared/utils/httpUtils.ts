import { Injectable } from 'angular2/core';
import { RequestOptions, Headers } from 'angular2/http';

@Injectable()
export class HttpUtils {
  
  constructor() { }
  
  getJsonRequestOptions() : RequestOptions {
    let headers = new Headers({ 'content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return options;
  }

}