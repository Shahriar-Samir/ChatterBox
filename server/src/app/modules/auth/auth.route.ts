import express from 'express';
import authController from './auth.controller';
import { validateAccessTokenForAuth } from '../../middlewares/auth';

const router = express.Router();

router.post('/userAuth', validateAccessTokenForAuth, authController.userAuth);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

const authRoutes = router;

export default authRoutes;
