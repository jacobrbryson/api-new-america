import { Router } from 'express';
import PublicRoutes from './public';
import GameRoutes from './game';

const router = Router();

router.use('/public', PublicRoutes);
router.use('/game', GameRoutes);

export default router;
