import express from 'express';
import usersController from './users.controller';

const router = express.Router();

router.get('/:uid', usersController.getSingleUser);
router.post('/', usersController.createUser);
router.patch('/', usersController.updateUser);
router.delete('/', usersController.deleteUser);

const usersRoutes = router;

export default usersRoutes;
