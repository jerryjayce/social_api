import { ResponseObject, ResponseObjectInterface } from "../../utils/ResponseObject";

import { PostCommentRepository } from "../repositories";
import mongoose from "mongoose";


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

    static async fetch_video_comments(req): Promise<ResponseObjectInterface> {
        // const response = response_object;
        const response = new ResponseObject("Success", 200, {});


        try {


            const is_valid_ObjectId = mongoose.Types.ObjectId.isValid(req.params.video_id);
            const video_comments = is_valid_ObjectId ? await PostCommentRepository.fetch_video_comments(req.params.video_id) : false;

            if (!video_comments || !is_valid_ObjectId) {

                response.message = "Video does not exist";
                response.http_status = 422;
                return response;

            }
            response.data = await PostCommentRepository.fetch_video_comments(req.params.video_id);

            return response;

        } catch (e) {
            console.log("An error while fetching post_comment", e);
            response.message = "An error while fetching post_comment";
            response.http_status = 500;
            return response;
        }
    }

    static async reply_comment(req): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});


        try {


            const is_valid_ObjectId = mongoose.Types.ObjectId.isValid(req.params.comment_id);
            const comment_exist = is_valid_ObjectId ? await PostCommentRepository.fetch_comment(req.params.comment_id) : false;


            if (!comment_exist || !is_valid_ObjectId) {
                response.message = "Comment does not exist";
                response.http_status = 422;
                return response;

            }

            const data = {
                ...req.body,
                comment: req.params.comment_id
            };

            response.data = await PostCommentRepository.reply_comment(data);

            return response;

        } catch (e) {
            console.log("An error while posting post_comment", e);
            response.message = "An error while posting post_comment";
            response.http_status = 500;
            return response;
        }

    }

    static async like_comment(req): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});

        try {

            const is_valid_ObjectId = mongoose.Types.ObjectId.isValid(req.params.comment_id);
            const comment_exist = is_valid_ObjectId ? await PostCommentRepository.fetch_comment(req.params.comment_id) : false;

            if (!comment_exist || !is_valid_ObjectId) {

                response.message = "Comment does not exist";
                response.http_status = 422;
                return response;

            }

            const data = {
                ...req.body,
                comment: req.params.comment_id     //ref to post_comment
            };

            response.data = await PostCommentRepository.like_comment(data);

            return response;

        } catch (e) {
            console.log("An error while posting post_comment", e);
            response.message = "An error while posting post_comment";
            response.http_status = 500;
            return response;
        }

    }


}
