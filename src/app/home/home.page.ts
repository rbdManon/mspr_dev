import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public navCtrl: NavController){}
  toCalculator(){
    this.navCtrl.navigateForward('calculator');
  }
  toMap(){
    if(window.navigator.onLine) {
      this.navCtrl.navigateForward('map');
    }
    else {
      this.navCtrl.navigateForward('map-offline');
    }
  }
  toFormList(){
    this.navCtrl.navigateForward('form/list');
  }
  ngOnInit() {
  }
}
