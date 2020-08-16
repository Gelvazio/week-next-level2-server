import { Router } from 'express';
import UsersController from './controllers/UsersController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const router = Router();

router.post('/users', UsersController.create);
router.get('/users', UsersController.index);

router.get('/classes', ClassesController.index);
router.post('/classes', ClassesController.create);

router.post('/connections', ConnectionsController.create);

export default router;
