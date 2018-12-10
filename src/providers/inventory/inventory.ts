import { Injectable } from '@angular/core';

/*
  Generated class for the InventoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventoryProvider {

  doc = true;

  constructor() {
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
