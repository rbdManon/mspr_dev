import { ResourceUri } from './ResourceUri';

export class Product {
    uuid: String
    generic: Boolean 
    name: String
    _links : {
        self: ResourceUri
        product: ResourceUri
        sales: ResourceUri
    }   
}