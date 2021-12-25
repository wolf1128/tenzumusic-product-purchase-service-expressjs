import { Router } from 'express';
import { registerUser } from '../controllers/userController';
const router = Router();

router.post('/', registerUser);

export default router;
