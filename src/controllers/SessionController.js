import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../config/auth';

const { secret, expiresIn } = authConfig;

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(401).json({ message: 'Validation fails' });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) res.status(401).json({ message: 'User not found' });

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ message: 'Password does not match' });
      }

      const { id, name } = user;

      return res.json({
        user: {
          id,
          name,
          email,
        },
        token: jwt.sign({ id }, secret, { expiresIn }),
      });
    } catch (error) {
      return res.status(400).json({ message: 'Ops', error });
    }
  }
}

export default new SessionController();
