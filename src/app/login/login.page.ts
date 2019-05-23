import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import sha256 from 'sha256';
import { DmoProvider } from '../providers/DmoProvider';
import { Dmo } from '../models/Dmo'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  formLogin : FormGroup;
  private password : String;
  private login : String 

  /**
   * constructor LoginPage
   * @param navCtrl to navigate between page
   * @param formBuilder  to create the form
   * @param dmoProvider to access request api about dmoes
   */
  constructor(private navCtrl : NavController, public formBuilder: FormBuilder, private dmoProvider: DmoProvider) {
     // Initialize the form and define fields and validators.
     this.formLogin = this.formBuilder.group({
      login:['', Validators.required],
      password:['', Validators.required],
    });
   }
  /**
   * SignIn this function log the user to the application
   * @param dmo NgForm
   */
  signIn(dmo:NgForm){
    // get data of the form
    this.login = dmo.value.login;
    this.password = sha256(dmo.value.password)
    //verify the identification
    if (this.formLogin.valid) {
      this.dmoProvider.getOneByLoginAndPassword(this.login ,this.password ).then(user => {
        this.navCtrl.navigateForward('home');
      });
    }else{
      alert('Tentative de connexion échouée. Veuillez réessayer.')
    }  
  }
  /**
   * toRegister() this function redirect to register page
   */
  toRegister(){
    this.navCtrl.navigateForward('register');
  }

  ngOnInit() {
  }

}
