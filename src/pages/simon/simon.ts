import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
      this.success = true;
      this.fail = false;
      this.sequence = [];
    }
    else{
      this.success = false;
      this.fail = true;
      this.sequence = [];
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  isColor(col : number, index : number):boolean{
    console.log("isColor ");
    console.log(index);
    console.log(this.sequence[index]==col);
    return (this.sequence[index]==col);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SimonPage');
  }

}