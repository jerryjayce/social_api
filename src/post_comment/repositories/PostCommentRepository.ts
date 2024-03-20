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


    static async create_post(post_data: object): Promise<any> {

        try {

            return await models.post.create(post_data).then(data => {
                return data;
            });

        } catch (e) {
            throw new Error(`error posting content ${e}`);
        }
    }

    static async fetch_post_by_id(id: number): Promise<any> {
        try {

            return await models.post.findOne({
                raw: true,
                where: {
                    id
                }
            });

        } catch (e) {
            throw new Error(`error fetching comment ${e}`);
        }

    }

    static async comment_on_post(post_data: object): Promise<any> {

        try {

            return await models.comment.create(post_data).then(data => {
                return data;
            });

        } catch (e) {
            throw new Error(`error posting content ${e}`);
        }
    }



}
