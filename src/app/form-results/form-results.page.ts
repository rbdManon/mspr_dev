import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Question } from '../models/Question';
import { QuestionProvider } from '../providers/QuestionProvider';
import { ActivatedRoute } from '@angular/router';
import { AnswerCountProvider } from '../providers/AnswerCountProvider';
import { AnswerCount } from '../models/AnswerCount';
import { QuestionType } from '../models/QuestionType';
import { Answer } from '../models/Answer';
import DynamicColors from '../utils/DynamicColors';

@Component({
  selector: 'app-form-results',
  templateUrl: './form-results.page.html',
  styleUrls: ['./form-results.page.scss'],
})
export class FormResultsPage {
  questions: Question[];
  answers: { [question_uuid: string]: AnswerCount[] }[];
  form_uuid: string;

  constructor(
    private QuestionProvider: QuestionProvider,
    private AnswerCountProvider: AnswerCountProvider,
    private route: ActivatedRoute,
  ) { }

  ionViewDidEnter() {
    this.form_uuid = this.route.snapshot.paramMap.get('form_uuid');

    this.QuestionProvider.getByFormUuidOrderPositionAsc(this.form_uuid)
      .then((questions) => {
        this.questions = questions
        this.getAnswers()
      })
  }

  getAnswers() {
    this.answers = [];
    this.questions.forEach((question) => {
      this.AnswerCountProvider.countResponseByQuestionUuidOrderByCount(question.uuid)
        .then(answers => {
          switch (question.questionType) {
            case QuestionType.FREE:
              this.answers[question.uuid] = answers;
              break;
            case QuestionType.UNIQUE:
              this.prepareUniqueGraph(question, answers);
              break;
            case QuestionType.MULTIPLE:
              this.prepareMultipleGraph(question, answers);
              break;
          }
        })
    })
  }

  prepareUniqueGraph(question: Question, answers: AnswerCount[]) {
    let labels = [];
    let data = [];
    let backgroundColors = [];

    answers.forEach(answer => {
      labels.push(answer._response)
      data.push(answer.total)
      backgroundColors.push(DynamicColors())
    })

    new Chart(document.getElementById(question.uuid), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
        }]
      }
    });
  }

  prepareMultipleGraph(question: Question, answers: AnswerCount[]) {
    let labelsData = [];
    answers.forEach(answer => {
      answer._response.forEach(response => {
        if (labelsData[response] != undefined) {
          labelsData[response] += answer.total
        }
        else {
          labelsData[response] = answer.total
        }
      });
    })

    let labels = [];
    let data = [];
    let backgroundColors = [];

    for (let label in labelsData) {
      labels.push(label)
      data.push(labelsData[label])
      backgroundColors.push(DynamicColors())
    }
    
    new Chart(document.getElementById(question.uuid), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
        }]
      }
    });
  }
}
