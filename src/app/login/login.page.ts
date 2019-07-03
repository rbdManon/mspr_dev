import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import sha256 from 'sha256';
import { DmoProvider } from '../providers/DmoProvider';
import { Dmo } from '../models/Dmo'
import LocalStorage from '../utils/LocalStorage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  private password: String;
  private login: String

  /**
   * constructor LoginPage
   * @param navCtrl to navigate between page
   * @param formBuilder  to create the form
   * @param dmoProvider to access request api about dmoes
   */
  constructor(
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private dmoProvider: DmoProvider
  ) {
    // Initialize the form and define fields and validators.
    this.formLogin = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  /**
   * SignIn this function log the user to the application
   * @param dmo NgForm
   */
  signIn(dmo: NgForm) {
    // get data of the form
    this.login = dmo.value.login;
    this.password = sha256(dmo.value.password)
    //verify the identification
    if (this.formLogin.valid) {
      this.dmoProvider.getOneByLoginAndPassword(this.login, this.password)
        .then(user => {
          this.navCtrl.navigateForward('home');
          LocalStorage.set('user', user);
        })
        .catch(() => {
          this.alertCtrl.create({
            header: 'Erreur de connexion',
            subHeader: 'Impossible de vous connectez',
            message: "Le login et le mot de passe ne correspondent pas.",
            buttons: ['OK']
          }).then((alert) => alert.present());
        });
    } else {
      this.alertCtrl.create({
        header: 'Erreur de connexion',
        subHeader: 'Impossible de vous connectez',
        message: "Veuillez saisir vos identifiants.",
        buttons: ['OK']
      }).then((alert) => alert.present());

    }
  }
  /**
   * toRegister() this function redirect to register page
   */
  toRegister() {
    this.navCtrl.navigateForward('register');
  }

  ngOnInit() {
  }

}
