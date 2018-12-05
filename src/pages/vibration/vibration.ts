import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private vibration: Vibration, private deviceOrientation: DeviceOrientation, private qrScanner: QRScanner) {
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
         var subscription = this.deviceOrientation.headingAccuracy().subscribe(
         (data: DeviceOrientationCompassHeading) => this.compassData=data
         );
          if(this.compassData.headingAccuracy > 150 && this.compassData.headingAccuracy < 210){
             this.vibration.vibrate([1000,3000,1000,3000]);
          }else if(this.compassData.headingAccuracy > 105 && this.compassData.headingAccuracy < 255){
             this.vibration.vibrate([1000,1000,1000,1000]);
          }if(this.compassData.headingAccuracy > 45 && this.compassData.headingAccuracy < 315){
             this.vibration.vibrate([1000,500,1000,500]);
          }else{
             this.vibration.vibrate([1000,100,1000]);
//              this.qrScanner.prepare()
//                .then((status: QRScannerStatus) => {
//                if (status.authorized) {
//                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
//                     console.log('Scanned something', text);            
//                     this.qrScanner.hide(); // hide camera preview
//                     scanSub.unsubscribe(); // stop scanning
//                     });
//                    }
//          }              
          
          }
      }

}
