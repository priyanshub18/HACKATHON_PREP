import { Router } from 'express';
import healthRouter from './health.routes.js';
import authRouter from './auth.routes.js';
import roleRouter from './role.routes.js';
import User from '../models/UserModel.js';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/api', roleRouter);
router.get('/', (req, res) => {
  res.json({
    name: 'backend-lumen-app',
    status: 'ok',
    version: '1.0.0',
    docs: '/docs',
    health: '/health',
  });
});

export default router;


