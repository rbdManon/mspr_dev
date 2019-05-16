import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin : FormGroup;
  constructor(public navCtrl : NavController, public formBuilder: FormBuilder) {
     // Create the form and define fields and validators.
     this.formLogin = this.formBuilder.group({
      login:['', Validators.required],
      password:['', Validators.required],
    });
   }
  signIn(){
    if (this.formLogin.valid) {
            this.navCtrl.navigateForward('home');
    }else{
      alert('Tentative de connexion échouée. Veuillez réessayer.')
    }
  }
  goRegister(){
    this.navCtrl.navigateForward('register');
  }

  ngOnInit() {
  }

}
