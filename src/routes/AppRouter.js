import { BrowserRouter, Switch } from 'react-router-dom';

import AppRoute from './AppRoute';

import routes from './routes';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      {routes.map((r) => (
        <AppRoute
          key={r.key || '404'}
          path={r.path}
          exact={r.exact}
          component={r.component}
          isPrivate={r.isPrivate}
          layout={r.layout}
        />
      ))}
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
