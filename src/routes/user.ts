import { Router } from 'express';
const router = Router();

import { createUser,getUser } from '../controllers/user';

router.route('/user')
.get(getUser)
.post(createUser);

export default router; 