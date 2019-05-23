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
  discountRateCalculated :number;
  netSellingPriceCalculated :number;
  netPurchasePriceCalculated :number;
  multiplicationCoefficientCalculated :number;
  constructor(public navCtrl : NavController, public formBuilder: FormBuilder) {
     // Create the form and define fields and validators.
     this.formCalcule = this.formBuilder.group({
      discountRate:['', Validators.pattern(/^[1-9]?[0-9]{1}$|^100$/)],
      grossPurchasePrice:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      multiplicationCoefficient:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      netPurchasePrice:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
      netSellingPrice:['', Validators.pattern(/^-?([0-9]\d*)?$/)],
    });
  }

  calcule(form :NgForm){
    if( form.value.grossPurchasePrice.length != 0  && form.value.discountRate.length != 0){
      this.netPurchasePriceCalculated =  form.value.grossPurchasePrice * (1-  form.value.discountRate/100);
    }
    else{
      this.netPurchasePriceCalculated = 0;
    }
    if( form.value.grossPurchasePrice.length != 0 && form.value.netPurchasePrice.length != 0){
      this.discountRateCalculated = (1 - form.value.netPurchasePrice / form.value.grossPurchasePrice) * 100 ; 
    }
    else{
      this.discountRateCalculated = 0;
    }
    if( form.value.netPurchasePrice.length != 0  && form.value.multiplicationCoefficient.length != 0 ){
      this.netSellingPriceCalculated =  form.value.netPurchasePrice  * form.value.multiplicationCoefficient;
    }
    else{
      this.netSellingPriceCalculated = 0;
    }
    if( form.value.netSellingPrice.length != 0 && form.value.netPurchasePrice.length != 0){
      this.multiplicationCoefficientCalculated = form.value.netSellingPrice / form.value.netPurchasePrice;
    }
    else{
      this.multiplicationCoefficientCalculated = 0;
    }
  }
 
  ngOnInit() {
  }

}
