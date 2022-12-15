import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProducerPage from './pages/ProducerPage';

export default function ReasonFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ProducerPage />
      </Route>
    </Switch>
  );
}
