import express from 'express';
import conversationsController from './conversations.controller';
import { validateAccessTokenWithUID } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/allUserConversations/:uid',
  // validateAccessTokenWithUID,
  conversationsController.getAllUserConversation,
);

router.get(
  '/singleConversation/:cid',
  // validateAccessTokenWithUID,
  conversationsController.getSingleUserConversation,
);
router.post(
  '/',
  // validateAccessTokenWithUID,
  conversationsController.startANewConversation,
);

router.patch(
  '/updateMIdOfConversation',
  // validateAccessTokenWithUID,
  conversationsController.updateMIDofConversation,
);
router.delete(
  '/:cid',
  validateAccessTokenWithUID,
  conversationsController.removedAConversation,
);

const conversationRoutes = router;

export default conversationRoutes;
