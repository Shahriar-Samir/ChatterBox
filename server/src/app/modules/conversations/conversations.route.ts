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
  '/startConversation',
  // validateAccessTokenWithUID,
  conversationsController.startANewConversation,
);

router.patch(
  '/updateMIdOfConversation',
  // validateAccessTokenWithUID,
  conversationsController.updateMIDofConversation,
);
router.patch(
  '/updateGroupConversation',
  // validateAccessTokenWithUID,
  conversationsController.updateGroupConversation,
);
router.delete(
  '/leaveGroup',
  // validateAccessTokenWithUID,
  conversationsController.leaveFromAGroupConversation,
);
router.delete(
  '/removeParticipant',
  // validateAccessTokenWithUID,
  conversationsController.removedAParticipantFromConversation,
);

router.put(
  '/addParticipantToGroup',
  // validateAccessTokenWithUID,
  conversationsController.addNewParticipantToGroup,
);

router.delete(
  '/:cid',
  validateAccessTokenWithUID,
  conversationsController.removedAConversation,
);

const conversationRoutes = router;

export default conversationRoutes;
