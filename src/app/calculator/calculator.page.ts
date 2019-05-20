import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  formCalcule : FormGroup;
  constructor(public navCtrl : NavController, public formBuilder: FormBuilder) {
     // Create the form and define fields and validators.
     this.formCalcule = this.formBuilder.group({
      discountRate:['', Validators.required],
      grossPurchasePrice:['', Validators.required],
      discountRateCalculated: ['', Validators.required],
    });
  }
  calcule(){}

  ngOnInit() {
  }

}
