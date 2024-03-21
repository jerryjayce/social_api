import { ResponseObject, ResponseObjectInterface } from "../../utils/ResponseObject";

import { PostCommentRepository } from "../repositories";


export class PostCommentService {
    static async create_post(req): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 201, {});

        try {

            const data = {
                post: req.body.post,
                user_id: req.body.user.id
            };

            response.data = await PostCommentRepository.create_post(data);

            return response;

        } catch (e) {
            console.log("An error occurred while creating post", e);
            response.message = "An error occurred while creating post";
            response.http_status = 500;
            return response;
        }

    }

    static async fetch_posts_by_user_id(req): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});

        try {

            response.data = await PostCommentRepository.fetch_posts_by_user_id(req.params.user_id);

            return response;

        } catch (e) {
            console.log("An error while fetching post_comment", e);
            response.message = "An error while fetching post_comment";
            response.http_status = 500;
            return response;
        }
    }

    static async comment_on_post(req): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});

        try {

            const post_exist = await PostCommentRepository.fetch_post_by_id(req.params.post_id);

            if (!post_exist ) {

                response.message = "Post does not exist";
                response.http_status = 422;
                return response;

            }

            const data = {
                comment: req.body.comment,
                post_id: req.params.post_id,
                user_id: req.body.user.id

            };

            response.data = await PostCommentRepository.comment_on_post(data);

            return response;

        } catch (e) {
            console.log("An error while posting comment", e);
            response.message = "An error while posting comment";
            response.http_status = 500;
            return response;
        }

    }

    static async fetch_top_posts_by_users(): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});

        try {

            response.data = await PostCommentRepository.fetch_top_posts_by_users();

            return response;

        } catch (e) {
            console.log("An error while fetching post_comment", e);
            response.message = "An error while fetching post_comment";
            response.http_status = 500;
            return response;
        }
    }



}
