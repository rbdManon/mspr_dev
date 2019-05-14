import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login:string;
  password:string;
  constructor(public navCtrl : NavController ) { }
  signIn(){
    if(this.login != null && this.password != null ){
      this.navCtrl.navigateForward('home');
    }
  }
  goRegister(){
    this.navCtrl.navigateForward('register');
  }

  ngOnInit() {
  }

}
