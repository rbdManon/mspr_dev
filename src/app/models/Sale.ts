import { ResourceUri } from './ResourceUri';

export class Sale {
    uuid: String
    date: Date
    quantity: Number
    _links : {
        self: ResourceUri
        sale: ResourceUri
        product: ResourceUri
        practitioner: ResourceUri
    } 
}