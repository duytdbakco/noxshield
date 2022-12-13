import ProfilePage from 'features/profile/pages/ProfilePage';
import ReasonPage from 'features/reason/pages/ReasonPage';

const routes = [
  {
    path: '/',
    component: ProfilePage,
    layout: null,
    isPrivate: true,
    exact: true,
  },

  {
    key: 'ReasonPage',
    path: '/reason',
    component: ReasonPage,
    layout: null,
    isPrivate: true,
    exact: true,
  },
];

export default routes;
