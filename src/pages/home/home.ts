import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition, Coordinates } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Observable';
import { filter } from 'rxjs/operator/filter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
    
export class HomePage {
        
    public geo: Geoposition;
    public date: number;
    public long: number;
    public lat: number;

  constructor(public navCtrl: NavController, private geolocation: Geolocation){
      let watch = this.geolocation.watchPosition()
                              .subscribe(position => {
    console.log(position.coords.longitude + ' ' + position.coords.latitude);
    this.geo = position;
    this.date = position.timestamp;   
    console.log(this.geo.coords.longitude);
                                  this.long = this.geo.coords.longitude;              
    });
  }

    /*this.geolocation.getCurrentPosition().then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
    });*/

}
