import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
export const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded',
      });
    }
    const body = new FormData();
    const { path } = req.file;
    const bs = fs.readFileSync(path, { encoding: 'base64' });
    body.append('image', bs);
    const imgbb = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      headers: body.getHeaders(),
      body,
    });
    console.log(imgbb.url);
    await fs.unlinkSync(path);
  } catch (error) {
    return res.status(500).json({
      error: 'something went wrong',
    });
  }
};
