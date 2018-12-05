import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import L from "leaflet";

@Component({
  selector: 'page-leaflet',
  templateUrl: 'leaflet.html'
})
export class LeafletPage {
      @ViewChild('map') mapContainer: ElementRef;
      map: any;
      center: L.PointTuple;

      constructor(public navCtrl: NavController, public navParams: NavParams) {
      }

      ionViewDidEnter() {
            this.loadmap();
      }

    centerLeafletMapOnMarker(map, marker) {
      let latLngs = [ marker.getLatLng() ];
      let markerBounds = L.latLngBounds(latLngs);
      map.fitBounds(markerBounds);
    }

     loadmap() {
        this.map = L.map("map").fitWorld();
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 17
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 15
    }).on('locationfound', (e) => {
      let markerGroup = L.featureGroup();
      this.centerLeafletMapOnMarker(this.map, L.marker([e.latitude, e.longitude]));
      let marker: any = L.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
        this.centerLeafletMapOnMarker(this.map, marker);
        console.log(this.map.getZoom());
      })
      L.circle(marker.getLatLng(), 150).addTo(this.map);
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err.message);
    })
  }

}
