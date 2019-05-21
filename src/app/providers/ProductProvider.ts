import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductProvider extends ApiProvider<Product> {
    protected table_name: string = "products";

    protected get_empty_object() {
      return new Product();
    }
}
