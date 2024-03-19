import SignupDto from "../dto/signup.dto";


import models from '../../../database/mongo_db/models';





export class AuthRepository {

    static async get_user_by_email(email: string): Promise<any> {
        try {

            const user: Document = await models.Users.findOne({ email: email });
            return user;

        } catch (e) {
            console.log("error fetching user details", e);
        }

    }

    static async signup(user_details: SignupDto): Promise<any> {

        try {

            const newUser = new models.Users(user_details);
            return  await newUser.save();

        } catch (e) {
            throw new Error(`error adding user ${e}`);
        }
    }
}
