import { bootstrap } from 'angular2/platform/browser';
import { enableProdMode } from 'angular2/core';

import { AppComponent } from './app.component';
import { APP_PROVIDERS } from './app.providers';

//enableProdMode(); //Uncomment for production

bootstrap(AppComponent, [
    APP_PROVIDERS
]).then(
    success => console.log('AppComponent bootstrapped!'),
    error => console.log(error)
);
