import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

export default routes;
