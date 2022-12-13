import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ReasonPage from './pages/ReasonPage';

export default function ReasonFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ReasonPage />
      </Route>
    </Switch>
  );
}
