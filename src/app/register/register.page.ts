import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formRegister : FormGroup
  
  //lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) {
      this.formRegister = this.formBuilder.group({
        lastname: ['', Validators.required],
        firstname: ['', Validators.required],
        login: ['', Validators.required],
        password: ['', Validators.required]

      });
   }
  signOn(){
    if(this.formRegister.valid){
      this.navCtrl.navigateForward('login');
    }
    else{
      alert('Vous devez saisir vos infomations')
    }
  }
  ngOnInit() {
  }

}
