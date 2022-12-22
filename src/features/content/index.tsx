import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ContentPage from './pages/ContentPage';
import DetailPage from './pages/DetailPage';

export default function ReasonFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ContentPage />
      </Route>
      <Route path={`${match.path}/detail/:id`}>
        <DetailPage />
      </Route>
    </Switch>
  );
}
