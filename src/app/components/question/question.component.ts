import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() question: Question;

  constructor() { }
  
  ionViewDidEnter() {
  }
}
