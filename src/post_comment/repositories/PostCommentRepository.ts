import models from "../../../database/mysql/models";


export class PostCommentRepository {

    static async fetch_posts_by_user_id(user_id: string): Promise<any> {
        try {
            return await models.post.findAll({
                raw: true,
                where: {
                    user_id
                }
            });

        } catch (e) {
            throw new Error(`error fetching video ${e}`);
        }

    }

    static async fetch_video(id: string): Promise<any> {
        try {
            // return await models.Videos
            //     .findOne({_id: id})
            //     .populate({
            //         path: "post_comment",
            //         populate: {
            //             path: "reply",
            //         }
            //     })

        } catch (e) {
            throw new Error(`error fetching video ${e}`);
        }

    }

    static async create_post(post_data: object): Promise<any> {

        try {

            return await models.post.create(post_data).then(data => {
                return data;
            });

        } catch (e) {
            throw new Error(`error posting content ${e}`);
        }
    }

    static async fetch_comment(id: string): Promise<any> {
        try {
            // return await models.Comments.findOne({_id: id})

        } catch (e) {
            throw new Error(`error fetching comment ${e}`);
        }

    }

    static async reply_comment(reply_data: string): Promise<any> {

        try {

            // const new_reply = new models.Replies(reply_data);
            // return await new_reply.save();

        } catch (e) {
            throw new Error(`error replying comment ${e}`);
        }
    }

    static async like_comment(like_data: string): Promise<any> {

        try {

            // const new_comment = new models.Likes(like_data);
            // return await new_comment.save();

        } catch (e) {
            throw new Error(`error posting comment ${e}`);
        }
    }


}
