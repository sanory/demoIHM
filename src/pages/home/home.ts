import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  title: any;


  constructor(public navCtrl: NavController, private inventoryProvider :InventoryProvider, public alertCtrl: AlertController){}
    


    goToPage(){
      this.navCtrl.push(TabsPage);
    }
    
    reset(){
        this.inventoryProvider.resetAcces();
        const alert = this.alertCtrl.create({
        title: 'Mise à zéro de la démo',
          subTitle: 'La démo a bien été remise à zéro',
          buttons: ['OK']
        });
        alert.present();        
    }
}
