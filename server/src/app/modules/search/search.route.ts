import express from 'express';
import searchController from './search.controller';

const router = express.Router();

router.get('/', searchController.searchUsersAndGroups);

const searchRoutes = router;

export default searchRoutes;
