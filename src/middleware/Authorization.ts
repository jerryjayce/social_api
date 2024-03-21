import jwt from 'jsonwebtoken';
import {ResponseHelper} from '../utils/ResponseHelper';

require('dotenv');

const auth = (req, res, next) => {
    try {

        const auth_header = req.headers['authorization'];


        if (auth_header && auth_header.startsWith('Bearer ')) {

            //grab token after the Bearer key word
            const token = auth_header.split(' ')[1];

            if (token) {

                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (!err) {

                        const user = decoded;
                        if (user && user.id && user.full_name && user.email) {
                            user.user_id = user.id;
                            req.body['user'] = user;
                            next();

                        } else {

                            ResponseHelper.send_response(res, 401, {});

                        }
                    } else {

                        ResponseHelper.send_response(res, 401, {});

                    }
                });

            } else {
                ResponseHelper.send_response(res, 401, {});
            }

        } else {

            ResponseHelper.send_response(res, 401, {}, "Invalid or missing Bearer token in Authorization header");

        }


    } catch (e) {
        ResponseHelper.send_response(res, 500, {});
    }
};


export {auth};
