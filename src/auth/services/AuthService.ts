import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {ResponseObject} from '../../utils/ResponseObject';



import {AuthRepository} from "../repositories";
import SignupDto from "../dto/signup.dto";



export class AuthService {
    static async login(email: string, password: string): Promise<object> {

        const response = new ResponseObject('Success', 200, {});

        try {

            const user_details = await AuthRepository.get_user_by_email(email);

            if (!user_details) {

                response.message = "Incorrect user name or password";
                response.http_status = 401;
                return response;

            }

            const check_pass = await bcrypt.compare(password, user_details.password);

            if (!check_pass) {
                response.message = "Incorrect user name or password";
                response.http_status = 401;
                return response;
            }


            //TODO remove sensitive data
            delete user_details.password;
            delete user_details.role;

            response.data = {
                user_details,
                token: await jwt.sign(
                    user_details,
                    process.env.JWT_SECRET
                )
            };

            response.message = "login successful";
            return response;

        } catch (e) {
            response.message = "An error occurred during login";
            response.http_status = 500;
            console.log("An error occurred during login", e);
        }

    }

    static async signup(data: SignupDto) {
        try {

            const response = new ResponseObject('Success', 200, {});



            const user_exist = await AuthRepository.get_user_by_email(data.email.toLowerCase());

            if (user_exist) {

                response.message = "Email address already used";
                response.http_status = 422;
                return response;

            }

            const salt_rounds = 10;
            const password = data.password;
            data.password = await bcrypt.hash(password, salt_rounds);
            data.email = data.email.toLowerCase();


            const result = await AuthRepository.signup(data);



            // remove sensitive data
            delete result.password;
            delete result.role;


            response.message = 'Signup successful';
            response.data = result;


            return response;

        } catch (e) {
            console.log(e);
            throw new Error(`${e}`);
        }
    }


}
