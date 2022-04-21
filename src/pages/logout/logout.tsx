import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { signOut } from '../../services/store/slices/auth';
import { useAppDispatch } from '../../utils/hooks';

export const LogoutPage = () => {
  const dispatch = useAppDispatch();
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
