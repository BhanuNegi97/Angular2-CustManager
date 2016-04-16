# Angular 2 Customer Manager Application

Simply clone the project or download and extract the .zip to get started. 

## Angular 2 Concepts Covered

* TypeScript version that relies on classes and modules
* Modules are loaded with System.js
* Defining routes 
* Using Custom Components
* Using Custom Directives
* Using Custom Pipes
* Defining Properties and Using Events in Components/Directives
* Using the Http object for Ajax calls along with RxJS observables
* Working with Utility and Service classes (such as for sorting and Ajax calls)
* Using Angular 2 databinding Syntax [], () and [()]
* Form validation

## Software Requiremenets

* Node.js 4.0.0 or higher
* MongoDB 3.2 or higher

## Loading MongoDB Data

Load data into MongoDB by performing the following steps:

* Execute 'mongod' to start the MongoDB daemon if it's not already running
* Open a command window and navigate to the `angular2-customermanager/server` directory 
* Execute 'mongo' to start the MongoDB shell
* Enter the following in the mongo shell to load the data seed file:
 * use customermanager
 * load("initMongoData.js")

## Running the Application

1. Run `npm install` to install app dependencies

1. Run `npm run tsc:w` in a separate terminal window to build the TypeScript code and watch for changes

1. Run `npm start` in a separate terminal window to build the TypeScript code and watch for changes

1. Browse to http://localhost:3000

We're hard at work on a new Angular 2 hands-on/instructor-led training course 
that will be released in Q2 of 2016! Contact us at training at wahlinconsulting.com 
if you'd like to run an onsite course at your company.