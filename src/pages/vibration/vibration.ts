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
  a = 0;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  private vibration: Vibration, 
  private deviceOrientation: DeviceOrientation, 
  private qrScanner: QRScanner, 
  private inventoryProvider :InventoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VibrationPage');
  }
    
  compassData: DeviceOrientationCompassHeading;
    
  VibrationPatternChanger(){
      // Get the device current compass heading
      this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => this.compassData=data,
      (error: any) => console.log(error)
       );
      
         while(1){ 
             // Watch the device compass heading change
             this.deviceOrientation.getCurrentHeading().then(
             (data: DeviceOrientationCompassHeading) => this.compassData=data
             );
              if(this.compassData.headingAccuracy > 150 && this.compassData.headingAccuracy < 210){
                 this.a=0;
                 this.vibration.vibrate([1000,3000,1000,3000]);
              }else if(this.compassData.headingAccuracy > 135 && this.compassData.headingAccuracy < 225){
                 this.a=0;
                 this.vibration.vibrate([1000,2500,1000,2500]);
              }else if(this.compassData.headingAccuracy > 120 && this.compassData.headingAccuracy < 240){
                 this.a=0;
                 this.vibration.vibrate([1000,2000,1000,2000]);
              }else if(this.compassData.headingAccuracy > 105 && this.compassData.headingAccuracy < 255){
                 this.a=0;
                 this.vibration.vibrate([1000,1750,1000,1750]);
              }else if(this.compassData.headingAccuracy > 90 && this.compassData.headingAccuracy < 270){
                 this.a=0;
                 this.vibration.vibrate([1000,1500,1000,1500]);
              }else if(this.compassData.headingAccuracy > 75 && this.compassData.headingAccuracy < 280){
                 this.a=0;
                 this.vibration.vibrate([1000,1250,1000,1250]);
              }else if(this.compassData.headingAccuracy > 60 && this.compassData.headingAccuracy < 295){
                 this.a=0;
                 this.vibration.vibrate([1000,1000,1000,1000]);
              }else if(this.compassData.headingAccuracy > 45 && this.compassData.headingAccuracy < 310){
                 this.a=0;
                 this.vibration.vibrate([1000,500,1000,500]);
              }else{
                 this.a=this.a+1;
                 this.vibration.vibrate([1000,100,1000]);
                 if(this.a>2){
                     break;
                 }
              }
          }
         this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        this.inventoryProvider.allowAcces();          
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                    });
                } else if (status.denied) {
                   // camera permission was permanently denied
                   // you must use QRScanner.openSettings() method to guide the user to the settings page
                   // then they can grant the permission from there
                } else {
                   // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
             })
             .catch((e: any) => console.log('Error is', e));
          }            
       }
           
    
    
    
    
 
    
    
    
    
    
    