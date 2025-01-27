import express from 'express';
import conversationsController from './conversations.controller';

const router = express.Router();

router.post('/', conversationsController.startANewConversation);

const conversationRoutes = router;

export default conversationRoutes;
