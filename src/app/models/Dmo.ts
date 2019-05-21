import { ResourceUri } from './ResourceUri';

export class Dmo {
    uuid: String
    firstname: String
    lastname: String
    login: String
    password: String
    _links : {
        self: ResourceUri
        dmo: ResourceUri
    } 
}