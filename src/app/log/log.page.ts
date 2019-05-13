import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {
  login:string;
  password:string;
  constructor(public navCtrl : NavController ) { }
  signIn(){
    this.navCtrl.navigateForward('home');
  }
  goRegister(){
    this.navCtrl.navigateForward('register');
  }
  ngOnInit() {
  }

}
