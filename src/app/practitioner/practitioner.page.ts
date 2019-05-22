import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.page.html',
  styleUrls: ['./practitioner.page.scss'],
})
export class PractitionerPage implements OnInit {
  public uuid: string;

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    console.log(this.uuid)
  }

  goHome() {
    this.navCtrl.navigateForward('home');
  }

}
