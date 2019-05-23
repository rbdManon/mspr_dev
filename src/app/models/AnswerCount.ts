export class AnswerCount {
    private response: string
    total: string

    get _response() {
        return JSON.parse(this.response)
    }

    set _response(value) {
        this.response = JSON.stringify(value)
    }
}