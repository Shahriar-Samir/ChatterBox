import express from 'express';
import messagesController from './messages.controller';

const router = express.Router();

router.post('/', messagesController.sendMessage);

const messagesRoutes = router;

export default messagesRoutes;
