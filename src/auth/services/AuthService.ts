import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { convert_to_mutable } from "../../utils/DataMethods";
import { ResponseObject, ResponseObjectInterface } from "../../utils/ResponseObject";
import { AuthRepository } from "../repositories";
import SignupDto from "../dto/signup.dto";


export class AuthService {
    static async login(email: string, password: string): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});

        try {

            let user_details = await AuthRepository.get_user_by_email(email.toLowerCase());

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

            user_details = convert_to_mutable(user_details);

            // remove sensitive data
            delete user_details.password;


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

    static async signup(data: SignupDto): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 201, {});

        try {

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
            const user_details = convert_to_mutable(result);


            // remove sensitive data
            delete user_details.password;


            response.message = "Signup successful";
            response.data = user_details;


            return response;

        } catch (e) {

            console.log("An error occurred during sign up", e);
            response.message = "An error occurred during sign up";
            response.http_status = 500;
            return response;

        }
    }


    static async fetch_users(): Promise<ResponseObjectInterface> {
        // const response = response_object;
        const response = new ResponseObject("Success", 200, {});


        try {

            const result = await convert_to_mutable(AuthRepository.fetch_users());
            const users_details = [];

            // remove sensitive data
            result.map(user => {

                delete user.password;
                users_details.push(user);

            });


            response.data = users_details;
            return response;

        } catch (e) {

            console.log("An error while fetching post_comment", e);
            response.message = "An error while fetching post_comment";
            response.http_status = 500;
            return response;

        }
    }


}
