import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormProvider } from 'src/app/providers/FormProvider';
import { Form } from 'src/app/models/Form';
import { Question } from 'src/app/models/Question';
import { QuestionProvider } from 'src/app/providers/QuestionProvider';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { QuestionEditComponent } from '../components/question-edit/question-edit.component';
import { QuestionType } from 'src/app/models/QuestionType';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.page.html',
  styleUrls: ['./form-edit.page.scss'],
})
export class FormEditPage {
  form_uuid: string;
  form: Form;
  questions: Question[];

  constructor(
    private route: ActivatedRoute,
    private FormProvider: FormProvider,
    private QuestionProvider: QuestionProvider,
    private ModalController: ModalController,
    private AlertController: AlertController,
    private navCtrl: NavController,
  ) { }

  ionViewDidEnter() {
    this.form_uuid = this.route.snapshot.paramMap.get('form_uuid')

    if(this.form_uuid != undefined) {
      this.getData()
    }
    else {
      this.form = new Form()
    }
  }

  getData() {
    this.FormProvider.getOne(this.form_uuid)
    .then(form => {
      this.form = form

      this.getQuestions();
    })
  }

  getQuestions() {
    this.QuestionProvider.getByFormUuidOrderPositionAsc(this.form_uuid)
    .then(questions => {
      this.questions = questions
    })
  }

  doReorder(ev) {    
    this.questions = ev.detail.complete(this.questions);
    this.reSetPosition();
  }

  reSetPosition() {
    for(let i = 0; i<this.questions.length; i++) {
      this.questions[i].position = i+1;
    }
  }

  updateQuestion(question: Question) {
    this.ModalController.create({
      component: QuestionEditComponent,
      componentProps: { question: question }
    }).then(modal => {
      modal.onDidDismiss().then(() => this.getQuestions())

      modal.present()
    })
  }

  addQuestion() {
    let new_question = new Question()
    new_question._options = ""
    new_question.questionType = QuestionType.FREE
    new_question.form = this.form._links.self.href
    new_question.position = this.questions.length+1

    let questions = this.questions
    questions.push(new_question)
    this.questions = questions
    this.updateQuestion(new_question)
  }

  deleteQuestion(question) {
    this.QuestionProvider.delete(question)
    .then(() => {
      let questions = this.questions
      var index = questions.indexOf(question)
      if (index > -1) {
        questions.splice(index, 1)
      }
      this.questions = questions
      this.reSetPosition()
    })
    .catch(() => {
      this.AlertController.create({
        header: 'Erreur !',
        subHeader: "Impossible de supprimer la question !",
        buttons: ['OK']
      }).then((alert) => alert.present())
    })    
  }

  save() {
    this.FormProvider.save(this.form)
    .then(() => {
      this.saveQuestions();
      
    })
    .catch(() => {
      this.AlertController.create({
        header: 'Erreur !',
        subHeader: "Impossible d'enregistrer le formulaire !",
        buttons: ['OK']
      }).then((alert) => alert.present())
    })
  }

  saveQuestions() {
    let savePromises = []
    this.questions.forEach(question => {
      savePromises.push(this.QuestionProvider.save(question))
    })

    Promise.all(savePromises)
    .then(() => {
      this.navCtrl.navigateBack('/form/list')
    })
    .catch(() => {
      this.AlertController.create({
        header: 'Erreur !',
        subHeader: "Impossible d'enregistrer l'une des questions !",
        buttons: ['OK']
      }).then((alert) => alert.present())
    })
  }
}
