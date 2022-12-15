import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ContentPage from './pages/ContentPage';

export default function ReasonFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ContentPage />
      </Route>
    </Switch>
  );
}
