import models from '../../../database/mongo_db/models';


export class CommentRepository {

    static async fetch_video_comments(id: string): Promise<any> {
        try {
            return await models.Videos
                .findOne({_id: id})
                .populate({
                    path: "comments",
                    populate: {
                        path: "reply",
                    }
                })

        } catch (e) {
            throw new Error(`error fetching video ${e}`);
        }

    }

    static async fetch_video(id: string): Promise<any> {
        try {
            return await models.Videos
                .findOne({_id: id})
                .populate({
                    path: "comment",
                    populate: {
                        path: "reply",
                    }
                })

        } catch (e) {
            throw new Error(`error fetching video ${e}`);
        }

    }

    static async post_comment(comment_data: string): Promise<any> {

        try {

            const new_comment = new models.Comments(comment_data);
            return await new_comment.save();
            // return await new_comment.save().then(result => {
            //     models.Comments
            //         .populate(new_comment, {path: "replies"})
            //         .then(comment => {
            //             return comment
            //         });
            // })

        } catch (e) {
            throw new Error(`error posting comment ${e}`);
        }
    }

    static async fetch_comment(id: string): Promise<any> {
        try {
            return await models.Comments.findOne({_id: id})

        } catch (e) {
            throw new Error(`error fetching comment ${e}`);
        }

    }

    static async reply_comment(reply_data: string): Promise<any> {

        try {

            const new_reply = new models.Replies(reply_data);
            return await new_reply.save();

        } catch (e) {
            throw new Error(`error replying comment ${e}`);
        }
    }

    static async like_comment(like_data: string): Promise<any> {

        try {

            const new_comment = new models.Likes(like_data);
            return await new_comment.save();

        } catch (e) {
            throw new Error(`error posting comment ${e}`);
        }
    }




}
