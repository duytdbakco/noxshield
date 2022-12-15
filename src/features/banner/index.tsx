import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BannerPage from './pages/BannerPage';

export default function ReasonFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <BannerPage />
      </Route>
    </Switch>
  );
}
