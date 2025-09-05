import { Router } from 'express';
import healthRouter from './health.routes.js';

const router = Router();

router.use('/health', healthRouter);

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


