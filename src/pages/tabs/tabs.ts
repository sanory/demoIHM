import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LeafletPage } from '../leaflet/leaflet';
import { Leaflet2Page } from '../leaflet2/leaflet2';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = LeafletPage;
  tab5Root = Leaflet2Page;

  constructor() {

  }
}
