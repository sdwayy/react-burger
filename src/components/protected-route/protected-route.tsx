import React from 'react';
import { useAppSelector } from '../../utils/hooks';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user, isUserLoaded } = useAppSelector(state => state.auth);

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

export default ProtectedRoute;
