import { bootstrap } from 'angular2/platform/browser';
import { enableProdMode } from 'angular2/core';

import { AppComponent } from './app.component';

//enableProdMode(); //Uncomment for production

bootstrap(AppComponent).then(
    success => console.log('AppComponent bootstrapped!'),
    error => console.log(error)
);
