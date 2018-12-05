import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';


/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  access : boolean;
    title: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private inventoryProvider :InventoryProvider) {

  }

  ionViewDidLoad() {
    this.access= this.inventoryProvider.getAcces();
    console.log('ionViewDidLoad InventoryPage');
  }



}
