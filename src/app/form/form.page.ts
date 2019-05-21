import { Component, OnInit } from '@angular/core';
import { FormProvider } from '../providers/FormProvider';
import { Form } from '../models/Form';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/Question';
import { QuestionProvider } from '../providers/QuestionProvider';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Practitioner } from '../models/Practitioner';
import { PractitionerProvider } from '../providers/PractitionerProvider';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  public form_uuid: string;
  public form: Form;
  public questions: Question[];
  practitioners: Practitioner[];
  practitioner: Practitioner;

  constructor(
    private route: ActivatedRoute,
    private FormProvider: FormProvider,
    private QuestionProvider: QuestionProvider,
    private PractitionerProvider: PractitionerProvider,
  ) { }

  ionViewDidEnter() {
    this.form_uuid = this.route.snapshot.paramMap.get('uuid');

    this.FormProvider.getOne(this.form_uuid).then(form => {
      this.form = form;
    })

    this.PractitionerProvider.getAll().then(practitioners => {
      this.practitioners = practitioners;
    })

    this.QuestionProvider.getByFormUuid(this.form_uuid).then(questions => {
      this.questions = questions;
    })
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }

  submit() {
    
  }
}
