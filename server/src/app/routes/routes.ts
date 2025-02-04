import express from 'express';

import authRoutes from '../modules/auth/auth.route';
import messagesRoutes from '../modules/messages/messages.route';
import usersRoutes from '../modules/users/users.route';
import conversationRoutes from '../modules/conversations/conversations.route';
import searchRoutes from '../modules/search/search.route';

const router = express.Router();

const routes = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/messages',
    route: messagesRoutes,
  },
  {
    path: '/conversations',
    route: conversationRoutes,
  },
  {
    path: '/search',
    route: searchRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
