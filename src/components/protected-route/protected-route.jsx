import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, isUserLoaded } = useSelector(state => state.auth);

  if (!isUserLoaded) return null;

  return (
    <Route
      {...rest}
      render={({ location }) => user
        ? children
        : <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

export default ProtectedRoute;
