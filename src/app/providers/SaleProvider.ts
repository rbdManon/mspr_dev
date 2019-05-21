import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';
import { Sale } from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class SaleProvider extends ApiProvider<Sale> {
  protected table_name: string = "sales";

  public getByPractitionerUuid(practitioner_uuid: string): Promise<Sale[]> {
    return this.RestProvider.get(this.api_endpoint + "practitioners/" + practitioner_uuid + "/sales")
      .then((res: Sale[]) => {
        let json = res['_embedded'][this.get_table_name()];
        return this.map_array_objects(json);
      })
  }

  public getByProductUuid(product_uuid: string): Promise<Sale[]> {
    return this.RestProvider.get(this.api_endpoint + "products/" + product_uuid + "/sales")
      .then((res: Sale[]) => {
        let json = res['_embedded'][this.get_table_name()];
        return this.map_array_objects(json);
      })
  }

  protected get_empty_object() {
    return new Sale();
  }
}
