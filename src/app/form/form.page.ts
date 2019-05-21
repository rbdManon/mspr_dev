import { Component, OnInit } from '@angular/core';
import { FormProvider } from '../providers/FormProvider';
import { Form } from '../models/Form';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/Question';
import { QuestionProvider } from '../providers/QuestionProvider';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  public form_uuid: string;
  public form: Form;
  public questions: Question[];

  constructor(
    private route: ActivatedRoute,
    private FormProvider: FormProvider,
    private QuestionProvider: QuestionProvider,
  ) { }

  ngOnInit() {
    this.form_uuid = this.route.snapshot.paramMap.get('uuid');

    this.FormProvider.getOne(this.form_uuid).then(form => {
      this.form = form;
    })

    this.QuestionProvider.getByFormUuid(this.form_uuid).then(questions => {
      this.questions = questions;
    })
  }
}
