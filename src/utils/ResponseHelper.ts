import { Response } from "express";


export interface ResponseHelperInterface {
    error: boolean;
    data: object;
    message: string;

}
export class ResponseHelper {

    static send_response(res: Response, status: number, data: any, message?: string): object {

        const response: ResponseHelperInterface = {
            error: null,
            data: data || {},
            message: message || data?.message || ""
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete response?.data?.message;

        try {

            switch (status) {
            case 200:
                response["error"] = false;
                response["message"] = response?.message || "Successful";
                break;
            case 201:
                response["error"] = false;
                response["message"] = response?.message || "Created Successfully";
                break;
            case 203:
                response["error"] = true;
                response["message"] = response?.message || "Non-Authoritative Information";
                break;
            case 204:
                response["error"] = true;
                response["message"] = response?.message || "No Content";
                break;
            case 400:
                response["error"] = true;
                response["message"] = response?.message || "Bad request";
                break;
            case 401:
                response["error"] = true;
                response["message"] = response?.message || "Unauthorized Access";
                break;
            case 403:
                response["error"] = true;
                response["message"] = response?.message || "Unauthorized Access";
                break;
            case 404:
                response["error"] = true;
                response["message"] = response?.message || "Resource Not Found";
                break;
            case 405:
                response["error"] = true;
                response["message"] = response?.message || "Method Not Allowed";
                break;
            case 409:
                response["error"] = true;
                response["message"] = response?.message || "Conflict";
                break;
            case 422:
                response["error"] = true;
                response["message"] = response?.message || "Method Not Allowed";
                break;
            case 500:
                response["error"] = true;
                response["message"] = response?.message || "An Error Occurred";
                break;
            case 503:
                response["error"] = true;
                response["message"] = response?.message || "Service Unavailable";
                break;
            }

            return res.status(status).json(response);

        } catch (e: any) {
            console.log(e);
            return res.status(500).json(e.message || e);
        }
    }

}

