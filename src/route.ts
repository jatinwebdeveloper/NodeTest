import { Router } from 'express';
const router = Router();

import Routes from "./routes/user"

router.use('/pub/proxy/',Routes);

export default router; 