import { CssBaseline } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { PageNotFound, PrivateRoute } from 'components/Common';
import { AppLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
declare module '@mui/styles/defaultTheme' {
  // tslint:disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}

function App() {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
