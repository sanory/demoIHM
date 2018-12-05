import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { LeafletPage } from '../leaflet/leaflet';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LeafletPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
