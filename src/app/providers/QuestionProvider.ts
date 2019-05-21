import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionProvider extends ApiProvider<Question> {
    protected table_name: string = "questions";

    public getByFormUuid(form_uuid : string) : Promise<Question[]> {
      return this.RestProvider.get(this.api_endpoint + "forms/" + form_uuid + "/question")
      .then((res : Question[]) => {
          return res['_embedded'][this.get_table_name()];
      })
  }
}
