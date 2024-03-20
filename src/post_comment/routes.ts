import express from "express";
import { PostCommentController } from "./controllers";


const router = express.Router({ mergeParams: true });


router.post("/post", PostCommentController.create_post);
router.get("/post/:user_id", PostCommentController.fetch_posts_by_user_id);
router.post("/post/comment", PostCommentController.comment_on_post);


export default router;
