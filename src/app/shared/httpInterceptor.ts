import { Injectable, Output, EventEmitter } from 'angular2/core';
import { Http, ConnectionBackend, RequestOptions, 
         Request, RequestOptionsArgs, Response, RequestMethod } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptor extends Http {
    
    @Output() requestStarted: EventEmitter<string> = new EventEmitter();
    @Output() requestCompleted: EventEmitter<string> = new EventEmitter();
    
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend, _defaultOptions);
    }
    
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.executeRequest(RequestMethod.Get, url, null, options);
    }
    
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.executeRequest(RequestMethod.Post, url, body, options);
    }
    
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.executeRequest(RequestMethod.Put, url, body, options);
    }
    
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.executeRequest(RequestMethod.Delete, url, null, options);
    }
    
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.executeRequest(RequestMethod.Patch, url, body, options);
    }
    
    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.executeRequest(RequestMethod.Head, url, null, options);
    }
    
    executeRequest(method: RequestMethod, url: string, body?:string, options?:RequestOptionsArgs) {
        this.requestStart(url, method);
        const args = (method === RequestMethod.Post || method === RequestMethod.Put) ? 
                    [url, body, options] : [url, options];
        return super[RequestMethod[method].toLowerCase()](...args)
            .map((res: Response) => {
                this.requestComplete(url, method);
                return res;
            });
    }
    
    requestStart(url: string, method: RequestMethod) {
        console.log(RequestMethod[method] + ' request started: ' + url);
        this.requestStarted.emit(url);
    }
    
    requestComplete(url: string, method: RequestMethod) {
        console.log(RequestMethod[method] + ' request completed: ' + url);
        this.requestCompleted.emit(url);
    }
    
}