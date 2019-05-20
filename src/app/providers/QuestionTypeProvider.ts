import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeProvider extends ApiProvider<QuestionTypeProvider> {
    protected table_name: string = "questionTypes";
}
