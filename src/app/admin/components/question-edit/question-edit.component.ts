import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/Question';
import { QuestionType } from 'src/app/models/QuestionType';
import { QuestionProvider } from 'src/app/providers/QuestionProvider';
import { NavController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
})
export class QuestionEditComponent {

  constructor(
    private QuestionProvider: QuestionProvider,
    private ModalController: ModalController,
    private alertController: AlertController,
  ) { }

  @Input() question: Question;
  options = null
  optionToSave = null
  ids = []

  ionViewDidEnter() {
    this.options = this.question._options
    this.optionToSave = JSON.parse(JSON.stringify(this.options))
  }

  addOption() {
    let responses = this.question._options
    responses.push('')
    this.question._options = responses
  }

  deleteOption(option) {
    let responses = this.question._options
    var index = responses.indexOf(option)
    if (index > -1) {
      responses.splice(index, 1)
    }
    this.question._options = responses
  }

  responseTypeChange() {
    switch (this.question.questionType) {
      case QuestionType.FREE:
          if(Array.isArray(this.question._options)) {
            this.question._options = null
          }
        break;

      case QuestionType.UNIQUE:
      case QuestionType.MULTIPLE:
        if(!Array.isArray(this.question._options)) {
          this.question._options = []
        }
        break;
    }
  }

  preSaveOption(key, e) {
    this.optionToSave[key] = e.target.value
  }

  save() {
    this.question._options = this.optionToSave
    this.QuestionProvider.save(this.question)
    .then((question) => {
      this.ModalController.dismiss(question)
    })
    .catch(() => {
      this.alertController.create({
        header: 'Erreur !',
        subHeader: "Impossible d'enregistrer la question !",
        buttons: ['OK']
      }).then((alert) => alert.present())
    })
  }
}
