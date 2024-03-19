export class ResponseObject {
    message: string;
    http_status: number;
    data: object;

    constructor(message = "", http_status = 200, data = {}) {
        this.message = message;
        this.http_status = http_status;
        this.data = data;
    }
}


export interface ResponseObjectInterface {
    message: string;
    http_status: number;
    data: object;
}

