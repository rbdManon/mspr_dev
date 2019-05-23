import { Component } from '@angular/core';
import { FormProvider } from '../providers/FormProvider';
import { Form } from '../models/Form';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { QuestionProvider } from '../providers/QuestionProvider';
import { Practitioner } from '../models/Practitioner';
import { PractitionerProvider } from '../providers/PractitionerProvider';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  public form_uuid: string;
  public form: Form;
  public question_count: number;
  practitioners: Practitioner[];
  practitioner: Practitioner;

  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private FormProvider: FormProvider,
    private QuestionProvider: QuestionProvider,
    private PractitionerProvider: PractitionerProvider,
    private Router: Router,
  ) { }

  ionViewDidEnter() {
    this.form_uuid = this.route.snapshot.paramMap.get('uuid');

    this.FormProvider.getOne(this.form_uuid).then(form => {
      this.form = form;
    })

    this.PractitionerProvider.getAll().then(practitioners => {
      this.practitioners = practitioners;
    })

    this.QuestionProvider.countByFormUuid(this.form_uuid).then(count => {
      this.question_count = count;
    })
  }

  startForm() {
    //Navigate to question 1 with the selected parameter
    this.Router.navigate(['/form/' + this.form_uuid + '/question/1'], { queryParams: { practitioner_uuid: this.practitioner.uuid }})
  }
}
