import { Response, Request } from "express";


import { CommentService } from "../services";
import { ResponseHelper } from "../../utils/ResponseHelper";
import {ResponseObjectInterface} from '../../utils/ResponseObject';



export default class CommentController {


    static async post_comment(req: Request, res: Response) {
        try {

            const data: ResponseObjectInterface = await CommentService.post_comment(req);
            return ResponseHelper.send_response(res, data?.http_status || 200, data?.data, data?.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }


    static async fetch_video_comments(req: Request, res: Response) {
        try {

            const data: ResponseObjectInterface = await CommentService.fetch_video_comments(req);
            return ResponseHelper.send_response(res, data?.http_status || 200, data.data, data.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }


    static async reply_comment(req: Request, res: Response) {
        try {

            const data: ResponseObjectInterface = await CommentService.reply_comment(req);
            return ResponseHelper.send_response(res, data?.http_status || 200, data?.data, data?.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }


    static async like_comment(req: Request, res: Response) {
        try {

            const data: ResponseObjectInterface = await CommentService.like_comment(req);
            return ResponseHelper.send_response(res, data?.http_status || 200, data?.data, data?.message);

        } catch (e) {
            console.log(e);
            return ResponseHelper.send_response(res, 500, {});
        }
    }


}
