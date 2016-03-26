import { Injectable } from 'angular2/core';

import { ILogService } from '../interfaces';

@Injectable()
export class LogService implements ILogService {
  
  constructor() { }
  
  log(message: string) {
    console.log(message);
  }

}