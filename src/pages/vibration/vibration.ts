import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { InventoryProvider } from '../../providers/inventory/inventory';

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

constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private vibration: Vibration,
  private qrScanner: QRScanner,
  private inventoryProvider :InventoryProvider) {
    this.title = 'Epreuve Démo'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VibrationPage');


  }
  ionViewWillEnter() {
    this.showCamera();
  }
  ionViewWillLeave() {
    this.hideCamera();
  }

  doClick() {
      alert("click");
    }

  beginPuzzle() {
      this.isRunning = true;
      launchePattern1();

}

  endPuzzle() {
    this.isRunning = false;
}


  VibrationPatternChanger() {
    console.log("Vibrate");
    this.isRunning = true;
}

launchPattern1() {

}

launchPattern2() {
}

launchPattern3() {
}

    scan(){
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
              if (status.authorized) {
                console.log("Autorise");
                let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                  console.log("Il est dans le let du scan");
                        this.inventoryProvider.allowAcces();
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
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











