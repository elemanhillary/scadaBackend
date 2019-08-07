import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Auth {
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static generateToken(username) {
    return jwt.sign({
      username,
    }, process.env.SECRET, { expiresIn: '24h' });
  }
}

export default Auth;
