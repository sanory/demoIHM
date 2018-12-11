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

  compassData: DeviceOrientationCompassHeading;

  VibrationPatternChanger() {
    console.log("Vibrate");      
    this.scan(); console.log("Apres scan");   
    
    let options = {
        frequency: 1500
    }; // Update every 1.5 seconds
    
    let watchID = navigator.compass.watchHeading(onSuccess, onError, options);
      
    window.addEventListener("compassneedscalibration",function(event) {
    // ask user to wave device in a figure-eight motion  
       event.preventDefault();
    }, true);
     
    window.addEventListener("deviceorientation",processEvent, true);      
            
            
    if((360 - event.alpha) > 150 && (360 - event.alpha) < 210){
        this.a=0;
        this.isR=true;
        this.isO=false;
        this.isY=false;
        this.isG=false;
        this.vibration.vibrate([1000,3000,1000,3000]);
    }else if(data.headingAccuracy > 135 && (360 - event.alpha) < 225){
        this.a=0;
        this.vibration.vibrate([1000,2500,1000,2500]);
    }else if((360 - event.alpha) > 120 && (360 - event.alpha) < 240){
        this.a=0;                 
        this.vibration.vibrate([1000,2000,1000,2000]);
    }else if((360 - event.alpha) > 105 && (360 - event.alpha) < 255){
        this.isR=false;
        this.isO=true;
        this.isY=false;
        this.isG=false;
        this.a=0;
        this.vibration.vibrate([1000,1750,1000,1750]);
    }else if((360 - event.alpha) > 90 && (360 - event.alpha) < 270){
         
        this.a=0;
        this.vibration.vibrate([1000,1500,1000,1500]);
    }else if((360 - event.alpha) > 75 && (360 - event.alpha) < 280){
        this.isR=false;
        this.isO=false;
        this.isY=true;
        this.isG=false;
        this.a=0;
        this.vibration.vibrate([1000,1250,1000,1250]);
    }else if((360 - event.alpha) > 60 && (360 - event.alpha) < 295){
        this.a=0;
        this.vibration.vibrate([1000,1000,1000,1000]);
    }else if((360 - event.alpha) > 45 && (360 - event.alpha) < 310){
        this.a=0;
        this.vibration.vibrate([1000,500,1000,500]);
    }else{
        this.isR=false;
        this.isO=false;
        this.isY=false;
        this.isG=true;
        this.a=this.a+1;
      this.vibration.vibrate([1000, 100, 1000, 100]);
      console.log("first");
      console.log("second");
    }            
          
          
         
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
    
  onSuccess(heading) {
    let element = document.getElementById('heading');
    element.innerHTML = 'Heading: ' + heading.magneticHeading;
  };
    
  onError(compassError) {
        alert('Compass error: ' + compassError.code);
  };
    
  processEvent(event) {
    // process the event object
  }
       }











