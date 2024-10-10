import { Router } from 'express';
import {
  getCryptoDeviation,
  getCryptoStats,
} from '../controllers/crypto.controller';

const router = Router();

router.route('/stats').get(getCryptoStats);
router.route('/deviation').get(getCryptoDeviation);
// router.
export default router;
