import { PractitionerType } from './PractitionerType';
import { ResourceUri } from './ResourceUri';
import { Sale } from './Sale';

export class Practitioner {
    uuid: String
    address: String 
    city: String
    companyName: String
    firstname: String
    lastname: String
    latitude: Number
    longitude: Number
    postcode: Number
    practitionerType: PractitionerType
    sales: Sale[]
    _links : {
        self: ResourceUri
        practitioner: ResourceUri
    }   
}