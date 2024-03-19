import { ResponseObject, ResponseObjectInterface } from "../../utils/ResponseObject";

import { CommentRepository } from "../repositories";
import mongoose from "mongoose";


export class CommentService {
    static async post_comment(req): Promise<ResponseObjectInterface> {

        // const response = response_object;
        const response = new ResponseObject("Success", 200, {});


        try {

            const is_valid_ObjectId = mongoose.Types.ObjectId.isValid(req.params.video_id);
            const video_exist = is_valid_ObjectId ? await CommentRepository.fetch_video(req.params.video_id) : false;

            if (!video_exist || !is_valid_ObjectId) {

                response.message = "Video does not exist";
                response.http_status = 422;
                return response;

            }

            const data = {
                ...req.body,
                video: req.params.video_id     //ref to video
            };

            response.data = await CommentRepository.post_comment(data);

            return response;

        } catch (e) {
            console.log("An error while posting comment", e);
            response.message = "An error while posting comment";
            response.http_status = 500;
            return response;
        }

    }

    static async fetch_video_comments(req): Promise<ResponseObjectInterface> {
        // const response = response_object;
        const response = new ResponseObject("Success", 200, {});


        try {


            const is_valid_ObjectId = mongoose.Types.ObjectId.isValid(req.params.video_id);
            const video_comments = is_valid_ObjectId ? await CommentRepository.fetch_video_comments(req.params.video_id) : false;

            if (!video_comments || !is_valid_ObjectId) {

                response.message = "Video does not exist";
                response.http_status = 422;
                return response;

            }
            response.data = await CommentRepository.fetch_video_comments(req.params.video_id);

            return response;

        } catch (e) {
            console.log("An error while fetching comment", e);
            response.message = "An error while fetching comment";
            response.http_status = 500;
            return response;
        }
    }

    static async reply_comment(req): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});


        try {


            const is_valid_ObjectId = mongoose.Types.ObjectId.isValid(req.params.comment_id);
            const comment_exist = is_valid_ObjectId ? await CommentRepository.fetch_comment(req.params.comment_id) : false;


            if (!comment_exist || !is_valid_ObjectId) {
                response.message = "Comment does not exist";
                response.http_status = 422;
                return response;

            }

            const data = {
                ...req.body,
                comment: req.params.comment_id
            };

            response.data = await CommentRepository.reply_comment(data);

            return response;

        } catch (e) {
            console.log("An error while posting comment", e);
            response.message = "An error while posting comment";
            response.http_status = 500;
            return response;
        }

    }

    static async like_comment(req): Promise<ResponseObjectInterface> {

        const response = new ResponseObject("Success", 200, {});

        try {

            const is_valid_ObjectId = mongoose.Types.ObjectId.isValid(req.params.comment_id);
            const comment_exist = is_valid_ObjectId ? await CommentRepository.fetch_comment(req.params.comment_id) : false;

            if (!comment_exist || !is_valid_ObjectId) {

                response.message = "Comment does not exist";
                response.http_status = 422;
                return response;

            }

            const data = {
                ...req.body,
                comment: req.params.comment_id     //ref to comment
            };

            response.data = await CommentRepository.like_comment(data);

            return response;

        } catch (e) {
            console.log("An error while posting comment", e);
            response.message = "An error while posting comment";
            response.http_status = 500;
            return response;
        }

    }


}
