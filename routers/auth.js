import express from 'express';
import { signin, signup, logout } from '../controllers/auth';
import { checkToken, checkStatus } from '../middlewares/checkToken';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/signout', checkToken, checkStatus, logout);
export default router;
