import { Component } from '@angular/core';

import { VibrationPage } from '../vibration/vibration';
import { AboutPage } from '../about/about';
import { LeafletPage } from '../leaflet/leaflet';
import { InventoryPage } from '../inventory/inventory';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = VibrationPage;
  tab2Root = LeafletPage;
  tab3Root = AboutPage;
  tab4Root = InventoryPage;

  constructor() {

  }
}
