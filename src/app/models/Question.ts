import { ResourceUri } from './ResourceUri';
import { QuestionType } from './QuestionType';

export class Question {
    uuid: string
    description: string
    name: string
    options: string
    questionType: QuestionType
    _links : {
        self: ResourceUri
        question: ResourceUri
        form: ResourceUri
    }   
}