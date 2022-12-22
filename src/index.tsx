import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import * as serviceWorker from './serviceWorker';
import { history } from 'utils';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense(
  'Mgo+DSMBMAY9C3t2VVhjQlFac1lJXGFWf1NpR2NbfU54flBAalhWVAciSV9jS3xSd0dgWX9fc3dSR2JUUA=='
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
