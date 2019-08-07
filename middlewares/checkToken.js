import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';

dotenv.config();
const { tokens } = db;

export const checkToken = (req, res, next) => {
  const token = req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  switch (token) {
    case token === undefined:
      return res.status(401).json({ error: 'unauthorized' });
    case token !== undefined:
      jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).json({
            error: 'unauthorized',
          });
        }
        req.decoded = decoded;
        next();
      });
  }
};

export const checkStatus = async (req, res, next) => {
  const token = req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  try {
    const status = await tokens.findOne({ where: { token } });
    if (status.status !== 'valid') {
      return res.json(401).json({
        error: 'session expired',
      });
    }
    next();
  } catch (error) {
    return res.json(500).json({
      error: 'something went wrong',
    });
  }
};
