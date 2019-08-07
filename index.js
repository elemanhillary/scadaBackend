import '@babel/polyfill';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import auth from './routers/auth';
import upload from './routers/upload';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/scada', auth);
app.use('/scada', upload);
app.all('*', (req, res) => res.status(404).json({
  error: 'not found',
}));
app.listen(process.env.PORT || 4000);
export default app;
