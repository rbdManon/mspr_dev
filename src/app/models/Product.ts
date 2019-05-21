import { ResourceUri } from './ResourceUri';
import { Sale } from './Sale';

export class Product {
    uuid: String
    generic: Boolean 
    name: String
    sales: Sale[]
    _links : {
        self: ResourceUri
        product: ResourceUri
    }   
}