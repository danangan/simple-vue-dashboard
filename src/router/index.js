import Vue from 'vue';
import Router from 'vue-router';
import { indexOf } from 'lodash';
import Login from '@/components/Login';
import Register from '@/components/Register';
import DashboardContainer from '@/container/DashboardContainer';
import ManageUser from '@/components/ManageUser';
// importing the store to access global state
import store from '../store';

Vue.use(Router);

const AppRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/',
      name: 'DashboardContainer ',
      component: DashboardContainer,
      redirect: 'manage-user',
      children: [
        {
          path: 'manage-user',
          name: 'ManageUser',
          component: ManageUser,
        },
      ],
    },
  ],
});

// This is an array that contain all of protected path that need user login
const needAuthRoutes = [
  // 'ManageUser',
  // 'ManageAdvisor',
  // 'ManageReport',
  // 'ManageThread',
  // 'ManageCategory',
  // 'ManageOnboarding',
];

const noAuthRoutes = [
  // 'Login',
  // 'Register',
];

/* eslint-disable no-unused */

// global route guard for authenticated and unauthenticated user
AppRouter.beforeEach((to, from, next) => {
  // check for login routes
  if (indexOf(needAuthRoutes, to.name) !== -1 && !store.state.auth.isAuthenticated) {
    next('/login');
  } else if (indexOf(noAuthRoutes, to.name) !== -1 && store.state.auth.isAuthenticated) {
    next('/manage-user');
  }
  next();
});

export default AppRouter;
