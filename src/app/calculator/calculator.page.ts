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
      discountRate:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      grossPurchasePrice:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      multiplicationCoefficient:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      netPurchasePrice:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      netSellingPrice:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      discountRateCalculated: [''],
      netPurchasePriceCalculated:[''],
      netSellingPriceCalculated:[''],
      multiplicationCoefficientCalculated: [''],

    });
  }
  calcule(){
    console.debug(this.formCalcule.value)

  }

  ngOnInit() {
  }

}
