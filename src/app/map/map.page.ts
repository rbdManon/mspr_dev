import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker } from 'leaflet';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  map: Map;
  location: {
    latitude: number,
    longitude: number
  };
  constructor(public geolocation: Geolocation,
    public navCtrl: NavController,
    public httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.locate()
  }

  locate() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = new Map('map').setView([resp.coords.latitude, resp.coords.longitude], 12);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      marker([resp.coords.latitude, resp.coords.longitude]).addTo(this.map)
        .bindPopup('Position actuelle .')
        .openPopup();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  goHome() {
    this.navCtrl.navigateForward('home');
  }
}

