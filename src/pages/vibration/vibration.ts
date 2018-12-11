import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { InventoryProvider } from '../../providers/inventory/inventory';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';

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

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private vibration: Vibration,
  private qrScanner: QRScanner,
  private inventoryProvider :InventoryProvider,
  private gyroscope: Gyroscope) {
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


  VibrationPatternChanger() {
    console.log("Vibrate");      
     
    
    let options: GyroscopeOptions = {
        frequency: 1000
    };

    this.gyroscope.getCurrent(options)
        .then((orientation: GyroscopeOrientation) => {
            console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
        })
        .catch()


    this.gyroscope.watch()
       .subscribe((orientation: GyroscopeOrientation) => {
          if(orientation.y < 0 && (orientation.x > -5 || orientation.x < 5)){
            this.vibration.vibrate(0);
            this.a=0;
            this.isR=true;
            this.isO=false;
            this.isY=false;
            this.isG=false;
            this.vibration.vibrate([1000,4000,1000,4000]);
         }else if(orientation.y < 0 && (orientation.x < -5 || orientation.x > 5)){
            this.vibration.vibrate(0);
            this.a=0;
            this.isR=false;
            this.isO=true;
            this.isY=false;
            this.isG=false;
            this.vibration.vibrate([1000,3000,1000,3000]);       
         }else if(orientation.y < -5 && (orientation.x > -5 || orientation.x < 5)){
            this.vibration.vibrate(0);  
            this.isR=false;
            this.isO=true;
            this.isY=false;
            this.isG=false;
            this.a=0;
            this.vibration.vibrate([1000,2000,1000,2000]);         
         }else if(orientation.y < -5 && (orientation.x > -5 || orientation.x < 5)){
            this.vibration.vibrate(0);  
            this.isR=false;
            this.isO=false;
            this.isY=true;
            this.isG=false;
            this.a=0;
            this.vibration.vibrate([1000,1000,1000,1000]);         
         }else if(orientation.y < -9 && (orientation.x < -5 || orientation.x > 5)){
            this.vibration.vibrate(0);
            this.isR=false;
            this.isO=false;
            this.isY=false;
            this.isG=true;
            this.a=this.a+1;
          this.vibration.vibrate([1000, 100, 1000, 100]);
          this.scan(); console.log("Apres scan");  
        }            
       });
             
            
            
    
          
          
         
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











