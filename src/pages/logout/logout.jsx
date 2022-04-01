import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signOut } from '../../services/store/slices/auth';

export const LogoutPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await dispatch(signOut());
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading) return null;

  return <Redirect to="/login" />
};
