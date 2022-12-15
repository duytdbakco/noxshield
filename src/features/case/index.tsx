import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CasePage from './pages/CasePage';

export default function ReasonFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <CasePage />
      </Route>
    </Switch>
  );
}
