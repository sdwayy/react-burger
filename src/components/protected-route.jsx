import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUser } from '../services/store/slices/auth';

const ProtectedRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const { user, isAuthorized } = useSelector(state => state.auth);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    if (isAuthorized) {
      await dispatch(getUser());
    }

    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

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
