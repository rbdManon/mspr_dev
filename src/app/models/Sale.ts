import { ResourceUri } from './ResourceUri';

export class Sale {
    uuid: String
    date: Date
    quantity: Number
    _links : {
        product: ResourceUri
        practitioner: ResourceUri
    } 
}