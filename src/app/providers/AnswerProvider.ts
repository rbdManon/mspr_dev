import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { Answer } from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerProvider extends ApiProvider<Answer> {
  protected table_name: string = "answers";

  public getByPractitionerUuid(practitioner_uuid: string): Promise<Answer[]> {
    return this.RestProvider.get(this.api_endpoint + "practitioners/" + practitioner_uuid + "/" + this.get_table_name())
      .then((res: Answer[]) => {
        let json = res['_embedded'][this.get_table_name()];
        return this.map_array_objects(json);
      })
  }

  public getByQuestionUuid(question_uuid: string): Promise<Answer[]> {
    return this.RestProvider.get(this.api_endpoint + "questions/" + question_uuid + "/" + this.get_table_name())
      .then((res: Answer[]) => {
        let json = res['_embedded'][this.get_table_name()];
        return this.map_array_objects(json);
      })
  }

  public getByPractitionerUuidAndQuestionUuid(practitioner_uuid: string, question_uuid: string): Promise<Answer[]> {
    return this.RestProvider.get(this.api_endpoint + this.get_table_name() + "/search/findAllByPractitionerUuidAndQuestionUuidOrderByDateResponseDesc?uuid_practitioner=" + practitioner_uuid + "&uuid_question=" + question_uuid)
      .then((res: Answer[]) => {
        let json = res['_embedded'][this.get_table_name()]
        return this.map_array_objects(json);
      })
  }

  protected get_empty_object() {
    return new Answer();
  }
}
