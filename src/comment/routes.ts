import express from 'express';
import {CommentController} from './controllers';


const router = express.Router({mergeParams: true});


router.post('/comment/post/:video_id', CommentController.post_comment);
router.post('/comment/reply/:comment_id', CommentController.reply_comment);
router.post('/comment/like/:comment_id', CommentController.like_comment);
router.get('/comments/:video_id', CommentController.fetch_video_comments);
router.get('/comment/replies/:comment_id', CommentController.fetch_video_comments);


export default router;
