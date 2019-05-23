import { PractitionerType } from './PractitionerType';
import { ResourceUri } from './ResourceUri';

export class Practitioner {
    uuid: string
    address: string 
    city: string
    companyName: string
    firstname: string
    lastname: string
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
        let name: string =  this.firstname + " " + this.lastname
        
        if(this.companyName !== "" && this.companyName !== null) {
            name += " (" + this.companyName + ")"
        }

        return name
    }
}