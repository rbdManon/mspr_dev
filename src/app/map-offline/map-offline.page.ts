import { Component, OnInit, Input } from '@angular/core';
import { PractitionerProvider } from '../providers/PractitionerProvider';
import { Practitioner } from '../models/Practitioner';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-map-offline',
  templateUrl: './map-offline.page.html',
  styleUrls: ['./map-offline.page.scss'],
})
export class MapOfflinePage implements OnInit {
  public array = new Array();

  constructor(private PractitionerProvider: PractitionerProvider,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.PractitionerProvider.getAll().then(practitioners => {
      practitioners.forEach((practitioner) => {
        (practitioner as any).distance = this.distance(practitioner.longitude, practitioner.latitude);

        if ((practitioner as any).distance > 50) {
          (practitioner as any).color = "green"
        }
        if ((practitioner as any).distance > 100) {
          (practitioner as any).color = "orange"
        }
        if ((practitioner as any).distance > 500) {
          (practitioner as any).color = "red"
        }

      })
      this.array = practitioners as [Practitioner];
    })
  }

  public distance(p1, p2) {
    var radlat1 = Math.PI * p1 / 180;
    var radlat2 = Math.PI * p2 / 180;
    var theta = p1 - p2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344

    return Math.floor(dist);
  }
}


