import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { VibrationPage } from '../pages/vibration/vibration';
import { InventoryPage } from '../pages/inventory/inventory';
import { LeafletPage } from '../pages/leaflet/leaflet';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Vibration} from '@ionic-native/vibration';
import {DeviceOrientation, DeviceOrientationCompassHeading} from '@ionic-native/device-orientation';
import { QRScanner } from '@ionic-native/qr-scanner';
import { InventoryProvider } from '../providers/inventory/inventory';
import { CameraPage } from '../pages/camera/camera';
import { SimonPage } from '../pages/simon/simon';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LeafletPage,
    VibrationPage,
    InventoryPage,
    CameraPage,
    SimonPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    VibrationPage,
    TabsPage,
    LeafletPage,
    InventoryPage,
    CameraPage,
    SimonPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    DeviceOrientation,
    QRScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InventoryProvider
  ]
})
export class AppModule {}
