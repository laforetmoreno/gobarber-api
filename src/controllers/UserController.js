import User from '../models/User';

class UserController {
  async store(req, res) {
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
    return res.json({ message: 'ok' });
  }
}

export default new UserController();
