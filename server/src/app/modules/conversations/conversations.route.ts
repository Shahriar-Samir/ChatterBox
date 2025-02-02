import express from 'express';
import conversationsController from './conversations.controller';
import { validateAccessTokenWithUID } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/:uid',
  validateAccessTokenWithUID,
  conversationsController.getAllUserConversation,
);
router.post(
  '/',
  validateAccessTokenWithUID,
  conversationsController.startANewConversation,
);
router.delete(
  '/:cid',
  validateAccessTokenWithUID,
  conversationsController.removedAConversation,
);

const conversationRoutes = router;

export default conversationRoutes;
