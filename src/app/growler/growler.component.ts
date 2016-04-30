import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const GROWLER_STYLES: string = `     
    .growler {
      position: fixed;
      z-index: 999999;
    }
    
    .growler.close-button:focus {
      outline: 0;
    }
    
    .growler.top-left {
      top: 12px;
      left: 12px;
    }
    
    .growler.top-right {
      top: 12px;
      right: 12px;
    }
    
    .growler.bottom-right {
      bottom: 12px;
      right: 12px;
    }
    
    .growler.bottom-left {
      bottom: 12px;
      left: 12px;
    }
    
    .growler.top-center {
      top: 12px;
      left: 50%;
      -webkit-transform: translate(-50%, 0%);
              transform: translate(-50%, 0%);
    }
    
    .growler.bottom-center {
      bottom: 12px;
      left: 50%;
      -webkit-transform: translate(-50%, 0%);
              transform: translate(-50%, 0%);
    }
    
    .growl {
      cursor: pointer;
      padding: 5;
      width: 285px;
      height: 65px; 
      opacity: 0;      
      display: flex;
      align-items: center;
      justify-content: center;
      
      -webkit-transition: opacity 1s;
      -moz-transition: opacity 1s; 
      -o-transition: opacity 1s;
      transition: opacity 1s;        
    }   
    
    .growl.active {        
      opacity: 1;
    } 
    
    .growl-message {

    }
`;

@Component({
  selector: 'growler',
  template: `
    <div [ngClass]="position" class="growler">
      <div *ngFor="let growl of growls" [ngClass]="{active: growl.enabled}" 
          class="growl alert {{ growl.messageType }}">
          <span class="growl-message">{{ growl.message }}</span>
      </div>
    </div>
  `,
  styles: [ GROWLER_STYLES ]
})

export class GrowlerComponent implements OnInit {
   
  private _growlCount: number = 0;  
  growls: Growl[] = [];
  
  @Input() position: string = 'bottom-right'; 
  @Input() timeout: number = 3000;
  
  constructor() { }

  ngOnInit() { }
   
  /**
  * Displays a growl message.
  *
  * @param {string} message - The message to display.
  * @param {GrowlMessageType} growlType - The type of message to display (a GrowlMessageType enumeration)
  * @return {number} id - Returns the ID for the generated growl
  */
  growl(message: string, growlType: GrowlMessageType) : number {  
     this._growlCount++;
     const bootstrapAlertType = GrowlMessageType[growlType].toLowerCase();
     const messageType = `alert-${ bootstrapAlertType }`;     
     
     const growl = new Growl(this._growlCount, message, messageType, this.timeout, this);
     this.growls.push(growl);
     return growl.id;
  }
  
  removeGrowl(id: number) {
    this.growls.forEach((growl: Growl, index: number) => {
      if (growl.id === id) {
        this.growls.splice(index, 1);
        this._growlCount--;
        console.log('removed ' + id)
      }
    });
  }
}

class Growl {
  
  enabled: boolean;
  timeoutId: number;
  
  
  constructor(public id: number, 
              private message: string, 
              private messageType: string, 
              private timeout: number, 
              private growlerContainer: GrowlerComponent) { 
    this.show();
  }
  
  show() {
    window.setTimeout(() => {
      this.enabled = true;
      this.setTimeout();
    }, 0);
  }
    
  setTimeout() {
    window.setTimeout(() => {
      this.hide();
    }, this.timeout);
  }  
  
  hide() {
    this.enabled = false;
    window.setTimeout(() => {
      this.growlerContainer.removeGrowl(this.id);
    }, this.timeout);
  }
  
}

export enum GrowlMessageType {
  Success,
  Danger,
  Warning,
  Info
}