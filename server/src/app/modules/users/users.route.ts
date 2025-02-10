import express from 'express';
import usersController from './users.controller';
import { validateAccessTokenWithUID } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/getSingleUser/:uid',
  // validateAccessTokenWithUID,
  usersController.getSingleUser,
);
router.get(
  '/getConversationUsers/:uid',
  //   validateAccessTokenWithUID,
  usersController.getConversationUsers,
);
router.post('/', usersController.createUser);
router.patch('/updateInfo/:uid', usersController.updateUserInfo);
router.patch('/updatePassword/:uid', usersController.updateUserPassword);
router.delete('/', usersController.deleteUser);

const usersRoutes = router;

export default usersRoutes;
