import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the VibrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vibration',
  templateUrl: 'vibration.html',
})
export class VibrationPage {
  title: any;
  a = 0;
  isR=false;
  isO=false;
  isY=false;
  isG=false;
  isRunning = false;
  seq : Array<number> = new Array;
  seq1: Array<number> = [1, 1, 1];
  seq2: Array<number> = [2, 2, 1, 2, 2];
  patternNo = 0;
  currentSize = 0;
  isPattern=false;
  isQRSCAN=false;
  isError=false;

constructor (public navCtrl: NavController, public navParams: NavParams, private vibration: Vibration, private qrScanner: QRScanner, private inventoryProvider :InventoryProvider, public alertCtrl: AlertController,)
  {
    this.title = 'Epreuve Démo';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VibrationPage');
  }

  ionViewWillEnter() {
    //this.showCamera();
  }

  ionViewWillLeave() {
    //this.hideCamera();
  }

  doClick() {
      alert("click");
    }

  beginPuzzle() {
      this.isRunning = true;
      this.launchPattern1();
}

  endPuzzle() {
    this.patternNo = 0;
    this.isRunning = false;
    this.isQRSCAN=false;
    this.seq = new Array();
}

  VibrationPatternChanger() {
    console.log("Vibrate");
    this.isRunning = true;
}

 wait(ms){
   let start = new Date().getTime();
   let end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

  launchPattern1() {
    this.patternNo=1;
    this.currentSize=this.seq1.length;
    this.isPattern=true;
    this.vibration.vibrate([400,100,400,100,400]);
    //this.wait(2000);  //7 seconds in milliseconds
    this.isPattern=false;
}

  launchPattern2() {
    this.patternNo=2;
    this.currentSize=this.seq2.length;
    this.isPattern=true;
    this.vibration.vibrate([1200,100,1200,200,400, 200, 1200,100, 1200]);
    //this.wait(4000);  //7 seconds in milliseconds
    this.isPattern=false;
}

  pressEvent(e) {
  if (this.seq.length > this.currentSize) {
    this.seq = new Array();
  }
      this.seq.push(2);
      this.seqCheck();
      console.log("pressed seq: " + this.seq);
}
    tapEvent(e) {
if (this.seq.length > this.currentSize) {
    this.seq = new Array();
  }
      this.seq.push(1);
      this.seqCheck();
      console.log("tap seq: " + this.seq);
}

  seqCheck(){
      this.isError=false;
      if (this.seq.length == this.currentSize) {
          switch(this.patternNo) {
          case 1:
              for (let i = 0; i < this.seq1.length; i++) {
                  if (this.seq1[i] != this.seq[i]) {
                      this.seqFail();
                      return;
                  }
              }
          this.seq1Success();
          break;
          case 2:
          for (let i = 0; i < this.seq2.length; i++) {
                  if (this.seq2[i] != this.seq[i]) {
                      this.seqFail();
                      return;
                  }
              }
          this.seq2Success();
          break;
          default:
          ;
          }
      }
  }

  replay(){
  switch(this.patternNo) {
  case 1:
    this.seq=new Array();
    this.launchPattern1();
    break;
  case 2:
    this.seq=new Array();
    this.launchPattern2();
    break;
  default:
    ;
  }
}

  seqFail() {
  this.isError=true;
  console.log("FAUX");
  this.seq = new Array();
}

  seq1Success() {
  this.seq = new Array();
  this.patternNo = 2;
  this.launchPattern2();
}

seq2Success() {
  this.seq = new Array();
  this.patternNo = 1;
  this.endPuzzle();
  this.scan();
}

    scan(){
        this.isQRSCAN=true;
        this.qrScanner.show();
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
              if (status.authorized) {
                console.log("Autorise");
                let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                  console.log("Il est dans le let du scan");
                        this.inventoryProvider.allowAcces();
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                        this.isQRSCAN=false;
                        this.isRunning=false;
                        this.qrScanner.destroy();
                        alert("Vous avez découvert le parchemin des anciens ! Il se trouve maintenant dans votre inventaire.");

                    });
              } else if (status.denied) {
                console.log("Non activé");
                   // camera permission was permanently denied
                   // you must use QRScanner.openSettings() method to guide the user to the settings page
                   // then they can grant the permission from there
              } else {
                console.log("Refusé");
                   // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
             })
             .catch((e: any) => console.log('Error is', e));

    }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

       }











