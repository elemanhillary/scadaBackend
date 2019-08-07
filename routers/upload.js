import express from 'express';
import multer from 'multer';
import { upload } from '../controllers/upload';
import { checkToken, checkStatus } from '../middlewares/checkToken';

const uploads = multer({ dest: './uploads' }).single('image');
const router = express.Router();
router.post('/upload', checkToken, checkStatus, uploads, upload);
export default router;
