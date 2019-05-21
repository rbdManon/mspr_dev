import { PractitionerType } from './PractitionerType';
import { ResourceUri } from './ResourceUri';

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
    _links : {
        self: ResourceUri
        practitioner: ResourceUri
        sales: ResourceUri
    }
    
    get name() {
        let name: String =  this.firstname + " " + this.lastname
        
        if(this.companyName !== "" && this.companyName !== null) {
            name += " (" + this.companyName + ")"
        }

        return name
    }
}