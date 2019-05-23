import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, tileLayer, marker } from 'leaflet';
import { NavController } from '@ionic/angular';
import { PractitionerProvider } from '../providers/PractitionerProvider';
import { Practitioner } from '../models/Practitioner';

import * as L from 'leaflet';

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
    private PractitionerProvider: PractitionerProvider,
  ) { }

  ngOnInit() {
    console.log('trigger')
  }

  ionViewDidEnter() {
    this.initMap(function (response) {
    })

  }

  addPracticioners(map) {
    this.PractitionerProvider.getAll().then(practitioners => {
      practitioners.forEach((practicioner_) => {
        var popup = L.popup()
          .setContent(this.content(practicioner_))

        var greenIcon = new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        marker([practicioner_.latitude, practicioner_.longitude], { icon: greenIcon }).addTo(map)
          .bindPopup(popup)

      })
    })
  }

  content(practicioner: Practitioner) {
    var content = `<ion-card>
                    <ion-card-header>
                      <ion-card-subtitle style="text-align:left">`+ practicioner.firstname + ` ` + practicioner.lastname + `</ion-card-subtitle>
                      <ion-card-title style="text-align: left">`+ practicioner.address + ` ` + practicioner.postcode + `</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <h1>`+ practicioner.companyName + ` ` + practicioner.city + `</h1>
                    </ion-card-content>
                    <ion-chip style="float: right;color:white;background-color:#5772F8" (click)="toPractitioner(`+practicioner.uuid+`)">Accéder</ion-chip>
                  </ion-card>`;
    return content;
  }

  initMap(callback) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = new Map('map').setView([resp.coords.latitude, resp.coords.longitude], 12);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

      var blueIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      marker([resp.coords.latitude, resp.coords.longitude], { icon: blueIcon }).addTo(this.map)
        .bindPopup('Position actuelle .')
        .openPopup();

      return this.addPracticioners(this.map)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  goHome() {
    this.navCtrl.navigateForward('home');
  }

  goPractitioner(id) {
    this.navCtrl.navigateForward('practitioner/'+id);
  }

}

