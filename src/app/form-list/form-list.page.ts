import { Component, OnInit } from '@angular/core';
import { PractitionerProvider } from '../providers/PractitionerProvider';
import { Practitioner } from '../models/Practitioner';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  constructor(
    private PractitionerProvider: PractitionerProvider,
  ) { }

  ngOnInit() {
    /**
     * GET ALL
     */
    this.PractitionerProvider.getAll().then(practitioners => {
      console.debug("GET ALL :")
      console.debug(practitioners)
    });

    
    /**
     * GET ONE
     */
    this.PractitionerProvider.getOne("0ab2234e-6640-4964-8465-26c1a41308a9").then(practitioner => {
      console.debug("GET ONE :")
      console.debug(practitioner)
    });

    
    /**
     * CREATE
     */
    let practitioner = new Practitioner();
    practitioner.address = "Adresse"
    practitioner.city = "City"
    practitioner.companyName = "Company Name"
    practitioner.firstname = "First name"
    practitioner.lastname = "Last name"
    practitioner.latitude = 1
    practitioner.longitude = 1
    practitioner.postcode = 44260
    practitioner.uuid_practitionerType = "ddb37376-77f9-11e9-9107-fa163e859eff"
    this.PractitionerProvider.create(practitioner).then(res => {
      console.debug("CREATE :")
      console.debug(res)
      practitioner = res;


      /**
       * UPDATE
       */
      practitioner.companyName = "Updated"
      this.PractitionerProvider.update(practitioner).then(res => {
        console.debug("UPDATE :")
        console.debug(res)
        practitioner = res;
      });
    });
  }

}
