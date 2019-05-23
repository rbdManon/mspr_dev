import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/Question';
import { Answer } from 'src/app/models/Answer';

@Component({
  selector: 'app-question-component',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() answer: Answer;
  @Input() disabled: Boolean;
  @Output() answerChange = new EventEmitter<Answer>();


  constructor() { }

  ngOnInit() {}

  radioChecked(event) {
    this.answer._response = event.detail.value
    this.answerChange.emit(this.answer)
  }

  checkboxChecked(event) {
    let array = this.answer._response

    if (event.detail.checked) {
      array.push(event.detail.value)
    }
    else {
      array = array.filter(value => {
        return value != event.detail.value;
      });
    }

    this.answer._response = array
    this.answerChange.emit(this.answer)
  }
}
