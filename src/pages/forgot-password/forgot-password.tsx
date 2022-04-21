import React, { useState } from 'react';

import {
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import routes from '../../routes';
import { useAppSelector } from '../../utils/hooks';
import { TLocationState } from '../../utils/types';

export const ForgotPasswordPage = () => {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const { state } = location;

  const { user } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    };

    setError('');

    fetch(routes.forgotPassword, data)
      .then(response => response.json())
      .then(({ success, message }) => {
        if (!success) {
          setError(message);
          return;
        }

        history.push({
          pathname: '/reset-password',
          state: {
            from: location,
          },
        });
      })
      .catch(() => {
        setError('Что-то пошло не так');
      })
  };

  if (user) {
    return <Redirect to={state?.from.pathname || '/'} />
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <h1 className="text text_type_main-medium">
          Восстановление пароля
        </h1>
        <form className="form pt-6 pb-20" onSubmit={onFormSubmit}>
          <Input
            type="email"
            onChange={onChange}
            value={formData.email}
            name="email"
            placeholder='Укажите e-mail'
          />
          {
            error
            && (
              <p className="text text_type_main-default text_color_error">
                {error}
              </p>
            )
          }
          <Button size="medium">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          <span className='mr-2'>Вспомнили пароль?</span>
          <Link
            to="/login"
            className="link text text_type_main-default text_color_accent"
          >
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
};
