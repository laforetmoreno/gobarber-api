import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/auth';
import multerConfig from './config/multer';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import FileController from './controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

// Users
routes.post('/users', UserController.store);

// Session
routes.post('/sessions', SessionController.store);

// Private routes
routes.use(authMiddleware);

// users
routes.put('/users', authMiddleware, UserController.update);

// Upload
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
