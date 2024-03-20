import models from "../../../database/mysql/models";
import { QueryTypes } from "sequelize";
// import { sequelize } from "sequelize";



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
            throw new Error(`error fetching post ${e}`);
        }

    }

    static async fetch_top_posts_by_users(): Promise<any> {
        try {

            const query = `
                SELECT 
                    u.full_name AS user_name,
                    COUNT(p.id) AS post_count,
                    MAX(c."createdAt") AS latest_comment_date,
                    (SELECT comment FROM comments WHERE user_id = u.id ORDER BY "createdAt" DESC LIMIT 1) AS latest_comment
                FROM 
                    users u
                LEFT JOIN 
                    posts p ON u.id = p.user_id
                LEFT JOIN 
                    comments c ON p.id = c.post_id
                GROUP BY 
                    u.id
                ORDER BY 
                    post_count DESC
                LIMIT 
                    3;
            `;
            return await models.sequelize.query(query, { type: QueryTypes.SELECT });

        } catch (e) {
            throw new Error(`error fetching top post ${e}`);
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
