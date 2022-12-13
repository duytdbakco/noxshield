import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import auth from 'utils/auth';

console.log('auth.isAuthenticated()');
console.log(auth.isAuthenticated());

const AppRoute = (props) => {
  const { component: Component, layout: Layout, path, exact, isPrivate } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(componentProps) => {
        if ((isPrivate && auth.isAuthenticated()) || !isPrivate) {
          if (Layout) {
            return (
              <Layout>
                <Component location={componentProps.location} history={componentProps.history} />
              </Layout>
            );
          }
          return <Component location={componentProps.location} history={componentProps.history} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: componentProps.location,
              },
            }}
          />
        );
      }}
    />
  );
};

AppRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType,
  path: PropTypes.string,
  exact: PropTypes.bool,
  isPrivate: PropTypes.bool,
};

AppRoute.defaultProps = {
  layout: null,
  path: null,
  exact: false,
  isPrivate: false,
};

export default AppRoute;
