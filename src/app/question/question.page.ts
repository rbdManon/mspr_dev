import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionProvider } from '../providers/QuestionProvider';
import { Question } from '../models/Question';
import { NavController, AlertController, NavParams } from '@ionic/angular';
import { AnswerProvider } from '../providers/AnswerProvider';
import { Practitioner } from '../models/Practitioner';
import { Answer } from '../models/Answer';
import { PractitionerProvider } from '../providers/PractitionerProvider';
import { QuestionType } from '../models/QuestionType';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage {
  form_uuid: string;
  question_position: number;
  question: Question;
  question_count: number;
  practitioner: Practitioner;
  practitioner_uuid: string;
  answer: Answer;
  previous_answers: Answer[];

  constructor(
    private route: ActivatedRoute,
    private QuestionProvider: QuestionProvider,
    private PractitionerProvider: PractitionerProvider,
    private AnswerProvider: AnswerProvider,
    private navCtrl: NavController,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ionViewDidEnter() {
    this.form_uuid = this.route.snapshot.paramMap.get('form_uuid')
    this.question_position = +this.route.snapshot.paramMap.get('position')
    this.route.queryParams.subscribe(params => {
      if (typeof params['practitioner_uuid'] !== 'undefined') {
        this.practitioner_uuid = params['practitioner_uuid']
      }

      this.getDatas();
    })
  }

  getDatas() {
    return new Promise((resolve, reject) => {
      Promise.all([this.setPractitioner(), this.setQuestion()])
        .then(() => {
          Promise.all([this.setAnswer(), this.setQuestionCount(), this.setPreviousAnswers()])
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }

  setQuestionCount() {
    return new Promise((resolve, reject) => {
      this.QuestionProvider.countByFormUuid(this.form_uuid)
        .then(number => {
          if (number) {
            this.question_count = number;
            resolve(number);
          }
          else {
            reject()
          }
        })
        .catch(reject)
    })
  }

  setPractitioner() {
    return new Promise((resolve, reject) => {
      this.PractitionerProvider.getOne(this.practitioner_uuid)
        .then((practitioner) => {
          if (practitioner && practitioner.uuid === this.practitioner_uuid) {
            this.practitioner = practitioner
            resolve(this.practitioner)
          }
          else {
            reject()
          }
        })
        .catch(reject)
    })
  }

  setQuestion() {
    return new Promise((resolve, reject) => {
      //Get the question
      this.QuestionProvider.getByFormUuidAndPosition(this.form_uuid, this.question_position)
        .then(question => {
          if (question) {
            this.question = question;
            resolve(this.question)
          }
          else {
            reject()
          }
        })
    })
  }

  setPreviousAnswers() {
    return new Promise((resolve, reject) => {
      //Get previous answers
      this.AnswerProvider.getByPractitionerUuidAndQuestionUuid(this.practitioner_uuid, this.question.uuid)
        .then(previous_answers => {
          if (previous_answers) {
            this.previous_answers = previous_answers;
            resolve(this.previous_answers)
          }
          else {
            reject()
          }
        })
    })
  }

  setAnswer() {
    return new Promise((resolve, reject) => {
      this.answer = this.getEmptyAnswer();
      resolve
    })
  }

  getEmptyAnswer(): Answer {
    let answer = new Answer()
    answer.practitioner = this.practitioner._links.self.href
    answer.question = this.question._links.self.href
    answer._response = ""

    if (this.question.questionType === QuestionType.MULTIPLE) {
      answer._response = new Array()
    }

    return answer
  }

  next() {
    if (this.question_position < this.question_count) {
      this.router.navigate(['/form/' + this.form_uuid + '/question/' + (this.question_position + 1)], { preserveQueryParams: true })
    }
    else {
      this.alertController.create({
        header: 'Succès !',
        subHeader: 'Le formulaire a été saisie avec succès !',
        buttons: ['OK']
      })
        .then(alert =>
          alert.present()
            .then(res => {
              this.navCtrl.navigateBack('/form/' + this.form_uuid)
            })
        )
    }
  }

  saveAnswer() {
    this.answer.dateResponse = new Date()

    this.AnswerProvider.save(this.answer)
      .then(() => { this.next() })
      .catch(() => {
        this.alertController.create({
          header: 'Erreur !',
          subHeader: "Impossible d'enregistrer la réponse !",
          buttons: ['OK']
        }).then((alert) => alert.present())
      })
  }
}
