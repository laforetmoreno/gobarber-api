import { Router } from 'express';
import authMiddleware from './middlewares/auth';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const routes = new Router();

// Users
routes.post('/users', UserController.store);

// Session
routes.post('/sessions', SessionController.store);

// Private routes
routes.use(authMiddleware);

// users
routes.put('/users', authMiddleware, UserController.update);

export default routes;
