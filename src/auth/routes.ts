import express from 'express';
import { AuthController } from './controllers';


const router = express.Router({ mergeParams: true });

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);

export default router;
