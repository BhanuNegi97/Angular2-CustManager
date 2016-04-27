import { provide, bind } from 'angular2/core';
import { NgLocalization } from 'angular2/common';
import { HTTP_PROVIDERS, Http, XHRBackend, RequestOptions, ConnectionBackend } from 'angular2/http';
import { FORM_PROVIDERS } from 'angular2/common';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { LocationStrategy, HashLocationStrategy } from 'angular2/platform/common';

import { DataService } from './shared/services/data.service';
import { AuthService } from './shared/services/auth.service';
import { LogService } from './shared/services/log.service';
import { HttpInterceptor } from './overlay/httpInterceptor';
import { CustomLocalization } from './shared/utils/customLocalization';
import { HttpUtils } from './shared/utils/httpUtils';
import { TrackByService } from './shared/services/trackby.service';

export const APP_PROVIDERS = [
    provide(NgLocalization, { useClass: CustomLocalization}),
    DataService,
    AuthService,
    LogService,
    TrackByService,
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
     //Uncomment to use the "old school" hash location strategy: http://localhost:3000/#/customers
    //bind(LocationStrategy).toClass(HashLocationStrategy)
];