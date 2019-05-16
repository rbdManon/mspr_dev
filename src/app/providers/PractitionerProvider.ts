import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { Practitioner } from '../models/Practitioner';

@Injectable({
  providedIn: 'root'
})
export class PractitionerProvider extends ApiProvider<Practitioner> {
    protected table_name: string = "practitioners";
}
