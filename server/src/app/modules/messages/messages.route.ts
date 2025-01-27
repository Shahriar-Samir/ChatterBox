import express from 'express';
import messagesController from './messages.controller';

const router = express.Router();

router.post('/', messagesController.sendMessage);
router.patch('/:mid', messagesController.editAMessage);
router.delete('/removeForAll/:mid', messagesController.removeAMessageForAll);
router.delete(
  '/removeForSender/:mid',
  messagesController.removeAMessageForSender,
);

const messagesRoutes = router;

export default messagesRoutes;
