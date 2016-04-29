#### Getting )]}', in JSON result from server.js

protectJSON.js in the server/lib folder adds this (Angular 1 only).

#### Getting Error with Loading Angular Imports - "number expected" in Angular 2 polyfill

Tried this:

//Simpler way but defaultJSExtensions is deprecated
// System.config({
//   paths: {
//     '@angular/*': '/node_modules/angular2/*.js',
//     'rxjs/*': '/node_modules/rxjs/*.js'
//   },
//   defaultJSExtensions: true,
//   warnings: true,
//   packages: {app: {format: 'register', defaultExtension: 'js'}} 
// });

System.config({
    packages: {
        '/src': {
            defaultExtension: 'js'
        },
        '/node_modules': {
            // defaultExtension: 'js'
        }
    },
    map: {
        angular2: '/node_modules/angular2',
        rxjs: '/node_modules/rxjs'
    }
});

System.import('app/main')
      .then(null, console.error.bind(console));
      
Although it works, you don't need any of this for this case. Turns out I was just missing the http script in this case! So simple, yet so hard 
to debug with the current error that Angular 2 polyfill throws.

#### Using Typings to get Google maps .d.ts type definition file

Can locate the proper name to use with "typings search maps". Then run "typings install google.maps --ambient --save". 

#### Navigating to parent route from within child route view breaks

Needed to add a / in front of the parent route to tell it to start from the root route config:

[routerLink]="['/CustomerEdit',{id:customer.id}]"



