import express from 'express';
import conversationsController from './conversations.controller';

const router = express.Router();

router.post('/', conversationsController.startANewConversation);
router.delete('/:cid', conversationsController.removedAConversation);

const conversationRoutes = router;

export default conversationRoutes;
