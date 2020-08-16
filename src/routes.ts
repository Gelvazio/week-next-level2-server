import { Router } from 'express';
import UserController from './controllers/UserController';
import ClasseController from './controllers/ClasseController';

const router = Router();

router.post('/users', UserController.create);
router.get('/users', UserController.index);

router.get('/classes', ClasseController.index);
router.post('/classes', ClasseController.create);

export default router;
