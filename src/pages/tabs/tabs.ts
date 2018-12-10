import { Component } from '@angular/core';

import { VibrationPage } from '../vibration/vibration';
import { AboutPage } from '../about/about';
import { LeafletPage } from '../leaflet/leaflet';
import { InventoryPage } from '../inventory/inventory';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CameraPage } from '../camera/camera';
import { SimonPage } from '../simon/simon';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  title: any;


  tab1Root = VibrationPage;
  tab2Root = LeafletPage;
  tab3Root = SimonPage;
  tab4Root = InventoryPage;


  constructor() {
    this.title = 'Epreuve de démo';
  }
}
