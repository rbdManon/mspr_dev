import { ResourceUri } from './ResourceUri';

export class Answer {
    uuid: string
    dateResponse: Date
    private response: string
    question: string
    practitioner: string
    _links : {
        self: ResourceUri
        answer: ResourceUri
        practitioner: ResourceUri
        question: ResourceUri
    }

    get _response() {
        return JSON.parse(this.response)
    }

    set _response(value) {
        this.response = JSON.stringify(value)
    }
}