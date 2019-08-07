import db from '../models';
import Auth from '../helpers/auth';
import { validateForm } from '../helpers/validate';

const { sequelize, users, tokens } = db;

export const signup = async (req, res) => {
  const { username } = req.body;
  const { error } = validateForm(req.body);
  if (error) {
    return res.status(400).json({
      error: 'username or password format wrong include a lowercase character and a number',
    });
  }
  const password = Auth.hashPassword(req.body.password);
  const transaction = await sequelize.transaction();
  try {
    const user = await users.create({ username, password }, { transaction });
    console.log(user);
    await transaction.commit();
    if (user) {
      return res.status(201).json({
        message: 'registered',
        user: {
          username,
        },
      });
    }
  } catch (err) {
    await transaction.rollback();
    return res.status(409).json({ error: `${err.errors[0].path.toLowerCase()} already exists` });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await users.findOne({
      where: { username },
    });
    if (!user) {
      res.status(404).json({
        error: 'username doesnot exist',
      });
    }
    const bool = Auth.comparePassword(password, user.password);
    if (bool) {
      const token = Auth.generateToken(username);
      await tokens.create({ token });
      return res.status(200).json({
        message: 'logged in',
        user: {
          username: user.username,
          token,
        },
      });
    }
    return res.status(401).json({
      error: 'wrong username or passowrd',
    });
  } catch (err) {
    return res.status(500).json({ message: 'something went wrong' });
  }
};

export const logout = async (req, res) => {
  const token = req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : req.headers.authorization;
  try {
    const tok = await tokens.findOne({
      where: {
        token,
      },
    });
    if (tok) {
      await tokens.update({ status: 'invalid' }, { where: { token } });
      return res.status(200).json({
        message: 'logged out',
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: 'something went wrong',
    });
  }
};
