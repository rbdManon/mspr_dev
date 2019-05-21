import { ResourceUri } from './ResourceUri';

export class Form {
    uuid: string
    description: string
    name: string
    _links : {
        self: ResourceUri
        question: ResourceUri
        form: ResourceUri
    } 
}