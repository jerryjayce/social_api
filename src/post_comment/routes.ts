import express from "express";
import { PostCommentController } from "./controllers";


const router = express.Router({ mergeParams: true });


router.post("/post", PostCommentController.create_post);
router.post("/post/comment", PostCommentController.comment_on_post);
router.get("/post/top", PostCommentController.fetch_top_posts_by_users);
router.get("/post/:user_id", PostCommentController.fetch_posts_by_user_id);


export default router;
