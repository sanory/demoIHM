import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { HomePage } from '../home/home';




/**
 * Generated class for the SimonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

enum Color {
  Blue,
  Green,
  Red,
  Yellow
}

@IonicPage()
@Component({
  selector: 'page-simon',
  templateUrl: 'simon.html',
})
export class SimonPage {
  success : boolean = false;
  fail : boolean = false;
  sequence : Array<Color> = new Array();
  correctSequence : Array<Color> = [Color.Blue, Color.Green, Color.Green, Color.Red]

  addToSequence(col : number){
    this.sequence.push(col);
    this.readSequence();
    if(this.fail || this.success){
      this.success = false;
      this.fail = false;
    }
    if (this.sequence.length >= 4){
      this.checkSequence();
    }
  }

  readSequence(){
    let result :string = "";
    this.sequence.forEach((col : Color) => {
            result = result + col;
    });
    console.log(result);
  }

  checkSequence(){
    let equals:boolean = false;
    if(this.sequence.length == this.correctSequence.length){
      equals = true;
      for(let i=0; i<this.sequence.length; i++){
        if(this.sequence[i] != this.correctSequence[i]){
          equals = false;
          break;
        }
      }
    }

    if(equals){
        this.winAlerte();
//      this.success = true;
//      this.fail = false;
        
      this.sequence = [];
    }
    else{
        this.looseAlerte();
//      this.success = false;
//      this.fail = true;
      this.sequence = [];
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private inventoryProvider :InventoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimonPage');
  }
    
    winAlerte() {
    const alert = this.alertCtrl.create({
      title: 'Vous avez gagné!',
      subTitle: 'Félicitations pour avoir réussi cette épreuve!',
      buttons: [
         {
          text: 'Terminer l\'épreuve',
          handler: () => {
                this.restart()
                    }
        }
       ]
    });
    alert.present();
  }
    
    looseAlerte() {
    const alert = this.alertCtrl.create({
      title: 'Mauvaise combinaison...',
      subTitle: 'Avez vous trouvé l\'indice grace au détecteur? Si oui, vous devriez peut être le relire...!',
      buttons: ['OK']
    });
    alert.present();
  }
    
    restart(){
        this.inventoryProvider.resetAcces();
        }
    


}