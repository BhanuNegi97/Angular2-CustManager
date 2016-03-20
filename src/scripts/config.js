//Simpler way but defaultJSExtensions is deprecated
// System.config({
//   paths: {
//     'angular2/*': '/node_modules/angular2/*.js',
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
        '/node_modules/angular2': {
            defaultExtension: 'js'
        },
        '/node_modules/rxjs': {
            defaultExtension: 'js'
        }
    },
    map: {
        angular2: '/node_modules/angular2',
        rxjs: '/node_modules/rxjs'
    }
});

System.import('app/main')
      .then(null, console.error.bind(console));