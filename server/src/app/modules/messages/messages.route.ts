import express from 'express';
import messagesController from './messages.controller';

const router = express.Router();

router.post('/', messagesController.sendMessage);

router.post('/sendMessage', messagesController.sendMessage);
router.delete('/:MId', messagesController.removeAMessageForAll);
router.delete('/:MId', messagesController.removeAMessageForSender);

const messagesRoutes = router;

export default messagesRoutes;
