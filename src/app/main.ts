import { bootstrap } from 'angular2/platform/browser';
import { bind, enableProdMode, provide } from 'angular2/core';
import { FORM_PROVIDERS, NgLocalization } from 'angular2/common';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions, ConnectionBackend } from 'angular2/http';

import { AppComponent } from './app.component';
import { HttpInterceptor } from './shared/httpInterceptor';
import { SERVICE_PROVIDERS } from './shared/services/service.providers';
import { CustomLocalization } from './shared/customLocalization';

//Used to associate calls to Http with custom HttpInterceptor class
export const CUSTOM_HTTP_PROVIDERS = [
    HTTP_PROVIDERS,
    provide(Http,
        {
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions) => {
                return new HttpInterceptor(xhrBackend, requestOptions)
            },
            deps: [XHRBackend, RequestOptions]
        })];

//enableProdMode(); //Uncomment for production

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    CUSTOM_HTTP_PROVIDERS,
    SERVICE_PROVIDERS,
    bind(LocationStrategy).toClass(HashLocationStrategy),
    provide(NgLocalization, {useClass: CustomLocalization})
]).then(
    success => console.log('AppComponent bootstrapped!'),
    error => console.log(error)
);
