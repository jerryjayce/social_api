import { Response, Request } from "express";
import { validate } from 'class-validator';


import { AuthService } from "../services";
import { ResponseHelper } from "../../utils/ResponseHelper";

import SignupDto from "../dto/signup.dto";


export default class AuthController {

    static async login(req: Request, res: Response) {
        try {

            const { email, password } = req.body;

            const data: any = await AuthService.login(email, password);

            return ResponseHelper.send_response(res, data?.http_status || 200, data.data, data.message);


        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }

    static async signup(req: Request, res: Response) {
        try {

            const loginData = new SignupDto(req.body);
            const errors = await validate(loginData);

            if (errors.length > 0) {
                return ResponseHelper.send_response(res,  422, errors);
            }

            const data: any = await AuthService.signup(req.body);

            return ResponseHelper.send_response(res, data?.http_status || 200, data.data, data.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }
}
