import express from 'express';
import {PostCommentController} from './controllers';


const router = express.Router({mergeParams: true});


router.post('/post', PostCommentController.create_post);
router.post('/comment/reply/:comment_id', PostCommentController.reply_comment);
router.post('/comment/like/:comment_id', PostCommentController.like_comment);
router.get('/comments/:video_id', PostCommentController.fetch_video_comments);
router.get('/comment/replies/:comment_id', PostCommentController.fetch_video_comments);


export default router;
