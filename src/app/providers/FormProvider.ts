import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { Form } from '../models/Form';

@Injectable({
  providedIn: 'root'
})
export class FormProvider extends ApiProvider<Form> {
    protected table_name: string = "forms";

    protected get_empty_object() {
      return new Form();
    }
}
