import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ message: 'Validation fails' });
    }

    try {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) res.status(400).json({ message: 'User already exists' });

      // In this case you can pass the entire req.body,
      // because the user model already checks the data that will be inserted in the database.
      // And returns only the data that interests the frontend
      const { name, email, id, provider } = await User.create(req.body);

      return res.json({
        name,
        email,
        id,
        provider,
      });
    } catch (error) {
      return res.status(400).json({ message: 'Ops', error });
    }
  }

  async update(req, res) {
    try {
      const { email, oldPassword } = req.body;

      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().findOne([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(401).json({ message: 'Validation fails' });
      }

      const user = await User.findByPk(req.userId);

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ message: 'Password does not match' });
      }
      // Error
      const { id, name, provider } = await User.update(req.body);

      return res.status(200).json({ id, name, provider });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Ops', error });
    }
  }
}

export default new UserController();
