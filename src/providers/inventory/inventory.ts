import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InventoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryProvider {
        
  doc = false;

  constructor(public http: HttpClient) {
    console.log('Hello InventoryProvider Provider');
  }
    
  allowAcces(){
      this.doc=true;
  }
    
  resetAcces(){
      this.doc=false;
  }
  
  getAcces(){
      return this.doc;
  }

}
