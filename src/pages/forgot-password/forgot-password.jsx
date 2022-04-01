import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

import { FORGOT_PASSWORD_URL } from '../../constants';

export const ForgotPasswordPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { state } = location;

  const { isAuthorized } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState('');

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = e => {
    e.preventDefault();

    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    };

    setError('');

    fetch(FORGOT_PASSWORD_URL, data)
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

  if (isAuthorized) {
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
          <Button primary={true} size="medium">
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
