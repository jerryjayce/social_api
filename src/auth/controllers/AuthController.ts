import { Response, Request } from "express";
import {ResponseObjectInterface} from '../../utils/ResponseObject';
import { class_validator_error_formatter } from '../../utils/ClassValidatorErrorFormatter';
import { validate } from 'class-validator';


import { AuthService } from "../services";
import { ResponseHelper } from "../../utils/ResponseHelper";

import SignupDto from "../dto/signup.dto";
import LoginDto from "../dto/login.dto";


export default class AuthController {

    static async login(req: Request, res: Response) {
        try {


            const loginData = new LoginDto(req.body);
            const errors = await validate(loginData);

            if (errors.length > 0) {
                const formatted_error =  class_validator_error_formatter(errors);
                return ResponseHelper.send_response(res,  422, formatted_error);
            }

            const { email, password } = req.body;

            const data: ResponseObjectInterface = await AuthService.login(email, password);

            return ResponseHelper.send_response(res, data?.http_status || 200, data.data, data.message);


        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }

    static async signup(req: Request, res: Response) {
        try {

            const signupData = new SignupDto(req.body);
            const errors = await validate(signupData);

            if (errors.length > 0) {
                const formatted_error =  class_validator_error_formatter(errors);
                return ResponseHelper.send_response(res,  422, formatted_error);
            }

            const data: ResponseObjectInterface = await AuthService.signup(req.body);

            return ResponseHelper.send_response(res, data?.http_status || 200, data.data, data.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }

    static async fetch_users(req: Request, res: Response) {
        try {

            const data: ResponseObjectInterface = await AuthService.fetch_users();

            return ResponseHelper.send_response(res, data?.http_status || 200, data.data, data.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }
}
