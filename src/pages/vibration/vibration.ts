import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
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
  private deviceOrientation: DeviceOrientation,
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
      // Get the device current compass heading
      this.deviceOrientation.getCurrentHeading().then(
        (data: DeviceOrientationCompassHeading) => { this.compassData = data; console.log(data.headingAccuracy);},
      (error: any) => console.log(error)
    ); console.log("Avant scan");
    this.scan(); console.log("Apres scan");

         
            // Watch the device compass heading change             
            var subscription = this.deviceOrientation.watchHeading().subscribe(
              (data: DeviceOrientationCompassHeading) => {
                console.log("Subscribe");
                if(data.headingAccuracy > 150 && data.headingAccuracy < 210){
                    this.a=0;
                    this.isR=true;
                    this.isO=false;
                    this.isY=false;
                    this.isG=false;
                    this.vibration.vibrate([1000,3000,1000,3000]);
                }else if(data.headingAccuracy > 135 && data.headingAccuracy < 225){
                    this.a=0;
                    this.vibration.vibrate([1000,2500,1000,2500]);
                }else if(data.headingAccuracy > 120 && data.headingAccuracy < 240){
                    this.a=0;                 
                    this.vibration.vibrate([1000,2000,1000,2000]);
                }else if(data.headingAccuracy > 105 && data.headingAccuracy < 255){
                    this.isR=false;
                    this.isO=true;
                    this.isY=false;
                    this.isG=false;
                    this.a=0;
                    this.vibration.vibrate([1000,1750,1000,1750]);
                }else if(data.headingAccuracy > 90 && data.headingAccuracy < 270){
                     
                    this.a=0;
                    this.vibration.vibrate([1000,1500,1000,1500]);
                }else if(data.headingAccuracy > 75 && data.headingAccuracy < 280){
                    this.isR=false;
                    this.isO=false;
                    this.isY=true;
                    this.isG=false;
                    this.a=0;
                    this.vibration.vibrate([1000,1250,1000,1250]);
                }else if(data.headingAccuracy > 60 && data.headingAccuracy < 295){
                    this.a=0;
                    this.vibration.vibrate([1000,1000,1000,1000]);
                }else if(data.headingAccuracy > 45 && data.headingAccuracy < 310){
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
                }}
            );
              
          
          subscription.unsubscribe(); 
         
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











