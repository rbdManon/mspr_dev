import { Component, OnInit } from '@angular/core';
import { PractitionerProvider } from '../providers/PractitionerProvider';

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
    this.PractitionerProvider.getAll().then((practitioners) => {
      console.debug(practitioners)
    });

    
    this.PractitionerProvider.getOne("5f0dddd1-77a5-11e9-9107-fa163e859eff").then((practitioner) => {
      console.debug(practitioner)
    });
  }

}
