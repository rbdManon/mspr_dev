import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { QuestionChoice } from '../models/QuestionChoice';

@Injectable({
  providedIn: 'root'
})
export class QuestionChoiceProvider extends ApiProvider<QuestionChoice> {
    protected table_name: string = "questionChoices";
}
