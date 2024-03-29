import express from 'express';
import { AuthController } from './controllers';
import {auth} from "../middleware/Authorization";


const router = express.Router({ mergeParams: true });

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.get('/users', auth, AuthController.fetch_users);

export default router;
