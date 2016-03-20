import { NgLocalization } from 'angular2/common';

export class CustomLocalization extends NgLocalization {
  
   getPluralCategory(value: any) {
      if(value > 1) {
         return 'many';
      }
   }
   
}