import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import sha256 from 'sha256';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin : FormGroup;
  constructor(public navCtrl : NavController, public formBuilder: FormBuilder, public http : HttpClient) {
     // Create the form and define fields and validators.
     this.formLogin = this.formBuilder.group({
      login:['', Validators.required],
      password:['', Validators.required],
    });
   }
  signIn(mdo:NgForm){
    let login = mdo.value.login;
    let password = sha256(mdo.value.password)
    console.log('log : '+login + '  pass : ' + password );
    // this.http.get('http://localhost:8080/dmoes/search/findByLoginAndPassword',
    // {'email':login, 'password':sha256(password)},
  
    // );
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
    console.log(sha256('lucas'))
  }

}
