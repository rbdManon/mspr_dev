import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { AnswerCount } from '../models/AnswerCount';

@Injectable({
  providedIn: 'root'
})
export class AnswerCountProvider extends ApiProvider<AnswerCount> {
  protected table_name: string = "answers";

  public countResponseByQuestionUuidOrderByCount(question_uuid: string): Promise<AnswerCount[]> {
    return this.RestProvider.get(this.api_endpoint + this.get_table_name() + "/search/countResponseByQuestionUuidOrderByCount?question_uuid=" + question_uuid)
      .then((res: []) => {
        return this.map_array_objects(res);
      })
  }

  protected get_empty_object() {
    return new AnswerCount();
  }
}
