import SignupDto from "../dto/signup.dto";


import models from '../../../database/mysql/models';





export class AuthRepository {

    static async get_user_by_email(email: string): Promise<any> {
        try {

            return await models.user.findOne({
                raw: true,
                where: {
                    email: email
                }
            });

        } catch (e) {
            console.log("error fetching user details", e);
        }

    }

    static async signup(user_details: SignupDto): Promise<any> {

        try {

            return await models.user.create(user_details).then(data => {
                return data;
            });

        } catch (e) {
            throw new Error(`error adding user ${e}`);
        }
    }
}
