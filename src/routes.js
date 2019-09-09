import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Morenao no postgres',
    email: 'teste@moreno.com.br',
    password_hash: 'ddfdsfsd',
  });

  res.send(user);
});

export default routes;
