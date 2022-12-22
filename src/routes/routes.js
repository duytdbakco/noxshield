import ProfilePage from 'features/profile/pages/ProfilePage';
import ReasonPage from 'features/reason/pages/ReasonPage';
import BannerPage from 'features/banner/pages/BannerPage';
import ProducerPage from 'features/producer/pages/ProducerPage';
import ContentPage from 'features/content/pages/ContentPage';
import CasePage from 'features/case/pages/CasePage';
import DetailPage from 'features/content/pages/DetailPage';

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
  {
    key: 'BannerPage',
    path: '/banner',
    component: BannerPage,
    layout: null,
    isPrivate: true,
    exact: true,
  },
  {
    key: 'ProducerPage',
    path: '/producer',
    component: ProducerPage,
    layout: null,
    isPrivate: true,
    exact: true,
  },
  {
    key: 'ContentPage',
    path: '/content',
    component: ContentPage,
    layout: null,
    isPrivate: true,
    exact: true,
  },
  {
    key: 'CasePage',
    path: '/case',
    component: CasePage,
    layout: null,
    isPrivate: true,
    exact: true,
  },
  {
    key: 'ContentItem',
    path: '/content/detail/:id',
    component: DetailPage,
    layout: null,
    isPrivate: true,
    exact: false,
  },
];

export default routes;
