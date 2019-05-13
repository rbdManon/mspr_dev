import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  lastname:string;
  firstname:string;
  login:string;
  password:string;
  constructor(public navCtrl: NavController) { }
  signOn(){
      this.navCtrl.navigateForward('log')
  }
  ngOnInit() {
  }

}
