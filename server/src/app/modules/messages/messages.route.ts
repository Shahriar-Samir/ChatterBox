import express from 'express';
import messagesController from './messages.controller';
import { validateAccessTokenWithUID } from '../../middlewares/auth';

const router = express.Router();

router.get('/:cid', messagesController.getAllConversationMessages);
router.post('/', validateAccessTokenWithUID, messagesController.sendMessage);
router.patch('/:mid', messagesController.editAMessage);
router.delete('/removeForAll/:mid', messagesController.removeAMessageForAll);
router.delete(
  '/removeForSender/:mid',
  messagesController.removeAMessageForSender,
);

const messagesRoutes = router;

export default messagesRoutes;
