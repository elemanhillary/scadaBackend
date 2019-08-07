import express from 'express';
import { upload } from '../controllers/upload';
import uploadimage from '../middlewares/uploadImage';

const router = express.Router();
router.post('/upload', uploadimage, upload);
export default router;
