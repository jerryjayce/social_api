import express from 'express';
import {PostCommentController} from './controllers';


const router = express.Router({mergeParams: true});


router.post('/post', PostCommentController.create_post);
router.get('/post/:user_id', PostCommentController.fetch_posts_by_user_id);
router.post('/comment/like/:comment_id', PostCommentController.like_comment);
router.get('/comments/:video_id', PostCommentController.fetch_posts_by_user_id);
router.get('/comment/replies/:comment_id', PostCommentController.fetch_posts_by_user_id);


export default router;
