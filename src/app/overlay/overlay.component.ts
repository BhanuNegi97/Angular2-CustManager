import { Component, Input, OnInit } from 'angular2/core';
import { Http } from 'angular2/http';
import { HttpInterceptor } from '../shared/httpInterceptor';

@Component({ 
  selector: 'overlay',
  template: `
    <!-- Using Flexbox for centering loader/indicator box. Won't work in 
         older browsers of course but I just don't care :-) -->
    <div [style]="overlayStyle" class="overlay-container">
        <div id="overlay-content" class="overlay-content">
          <ng-content></ng-content>
        </div>
    </div>
  `,
  styles: [`
    .overlay-container { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      height:100%; 
      width:100%; 
      top:0; 
      position: fixed;  
      background-color: rgba(0, 0, 0, 0.3);
    }
      
    .overlay-content {  
      border: 1px solid #000; 
      background-color:#fff; 
      font-weight: bold;
      height: 100px;
      width: 300px;
      z-index:1000;
      text-align:center;
      opacity: 1;
      position: relative;
    }
  `]
})
export class OverlayComponent implements OnInit {
  
    enabledStyle: string = 'display: flex';
    disabledStyle: string = 'display: none';
    overlayStyle: string = this.disabledStyle;
    http: HttpInterceptor;
    queue: string[] = [];
    
    @Input() delay: number = 100;
  
    constructor(http: Http) {
       //Cast to HttpInterceptor that's actually provided (see ../main.ts provider code for Http)
       this.http = <HttpInterceptor>http;
    }
    
    ngOnInit() {
        //Get notified as an XHR request is started
        this.http.requestStarted.subscribe((url: string) => {
            this.queue.push(url);
            
            if (this.queue.length === 1) {
                setTimeout(() => {
                    if (this.queue.length) {
                        this.overlayStyle = this.enabledStyle;
                    }
                }, this.delay);
            }
        });
        
        //Get notified as an XHR response is received
        this.http.requestCompleted.subscribe((url: string) => {
            this.queue.pop();
            
            if (this.queue.length === 0) {
                setTimeout(() => {
                    //Ensure we're still at 0 since another XHR call could have been triggered
                    //This helps avoid flicker
                    if (this.queue.length === 0) {
                        this.overlayStyle = this.disabledStyle;
                    }
                }, this.delay)
            }
        });     
    }

}
