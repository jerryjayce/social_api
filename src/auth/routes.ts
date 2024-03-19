import express from 'express';
import { AuthController } from './controllers';
import { catchAsync } from '../utils/error-service';

const router = express.Router({ mergeParams: true });

router.post('/login', catchAsync(AuthController.login));
router.post('/signup', catchAsync(AuthController.signup));

export default router;
