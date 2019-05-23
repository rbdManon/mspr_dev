import { ResourceUri } from './ResourceUri';
import { QuestionType } from './QuestionType';
export class Question {
    uuid: string
    description: string
    name: string
    private options: string
    questionType: QuestionType
    _links : {
        self: ResourceUri
        question: ResourceUri
        form: ResourceUri
        answers: ResourceUri
    }

    get _options() {
        return JSON.parse(this.options);
    }

    set _options(data) {
        this.options = JSON.stringify(data)
    }
}