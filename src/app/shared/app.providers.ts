import { provide, bind, OpaqueToken } from 'angular2/core';
import { NgLocalization } from 'angular2/common';
import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions, ConnectionBackend } from 'angular2/http';
import { FORM_PROVIDERS } from 'angular2/common';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { LogService } from './services/log.service';
import { HttpInterceptor } from './utils/httpInterceptor';
import { CustomLocalization } from './utils/customLocalization';
import { HttpUtils } from './utils/httpUtils';

export const APP_PROVIDERS = [
    provide(NgLocalization, { useClass: CustomLocalization}),
    DataService,
    AuthService,
    LogService,
    HttpUtils,
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(Http,
        {
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, logService: LogService) => {
                return new HttpInterceptor(xhrBackend, requestOptions, logService)
            },
            deps: [XHRBackend, RequestOptions, LogService]
        }),
    bind(LocationStrategy).toClass(HashLocationStrategy)
];