import { Component, OnInit } from '@angular/core';
import { Form } from '../models/Form';
import { FormProvider } from '../providers/FormProvider';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage {
  public forms: Form[];

  constructor(
    private FormProvider: FormProvider,
  ) { }

  ionViewDidEnter() {
    this.FormProvider.getAll().then(forms => {
      this.forms = forms;
    })
  }
}
