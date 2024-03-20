import { Response, Request } from "express";


import { PostCommentService } from "../services";
import { ResponseHelper } from "../../utils/ResponseHelper";
import {ResponseObjectInterface} from '../../utils/ResponseObject';
import CreatePostDto from "../dto/CreatePost.dto";
import PostCommentDto from "../dto/PostComment.dto";
import { validate } from "class-validator";
import { class_validator_error_formatter } from "../../utils/ClassValidatorErrorFormatter";



export default class PostCommentController {


    static async create_post(req: Request, res: Response) {
        try {

            const createPost = new CreatePostDto(req.body);
            const errors = await validate(createPost);

            if (errors.length > 0) {
                const formatted_error =  class_validator_error_formatter(errors);
                return ResponseHelper.send_response(res,  422, formatted_error);
            }


            const data: ResponseObjectInterface = await PostCommentService.create_post(req);
            return ResponseHelper.send_response(res, data?.http_status || 200, data?.data, data?.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }


    static async fetch_posts_by_user_id(req: Request, res: Response) {
        try {

            const data: ResponseObjectInterface = await PostCommentService.fetch_posts_by_user_id(req);
            return ResponseHelper.send_response(res, data?.http_status || 200, data.data, data.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }


    static async comment_on_post(req: Request, res: Response) {
        try {

            const post_comment = new PostCommentDto(req.body);
            const errors = await validate(post_comment);

            if (errors.length > 0) {
                const formatted_error =  class_validator_error_formatter(errors);
                return ResponseHelper.send_response(res,  422, formatted_error);
            }

            const data: ResponseObjectInterface = await PostCommentService.comment_on_post(req);
            return ResponseHelper.send_response(res, data?.http_status || 200, data?.data, data?.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }


}
