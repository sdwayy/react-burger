import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { RESET_PASSWORD_URL } from '../../constants';

export const ResetPasswordPage = () => {
  const history = useHistory();
  const { state } = useLocation();

  const passwordInputRef = useRef();
  const { isAuthorized } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    password: '',
    token: '',
  });

  const [passwordIsVisible, setPasswordVisibilty] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisibilty(!passwordIsVisible);
  };

  const onPasswordInputBlur = () => {
    if (passwordIsVisible) {
      togglePasswordVisibility();
    }
  };

  const onPasswordInputIconClick = () => {
    togglePasswordVisibility();
    passwordInputRef.current.focus();
  };

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

    fetch(RESET_PASSWORD_URL, data)
      .then(response => response.json())
      .then(({ success, message }) => {
        if (!success) {
          setError(message);
          return;
        }

        history.push({ pathname: '/login' });
      })
      .catch(() => {
        setError('Что-то пошло не так');
      })
  };

  const from = state?.from.pathname;

  if (isAuthorized || from !== '/forgot-password') {
    return <Redirect to={state?.from.pathname || '/'} />
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <h1 className="text text_type_main-medium">
          Восстановление пароля
        </h1>
        <form
          className="form pt-6 pb-20"
          onSubmit={onFormSubmit}
        >
          <Input
            type={passwordIsVisible ? 'text' : 'password'}
            icon={passwordIsVisible ? 'HideIcon' : 'ShowIcon'}
            onIconClick={onPasswordInputIconClick}
            onChange={onChange}
            value={formData.password}
            name="password"
            placeholder="Введите новый пароль"
            onBlur={onPasswordInputBlur}
            ref={passwordInputRef}
          />
          <Input
            onChange={onChange}
            value={formData.token}
            name="token"
            placeholder="Введите код из письма"
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
            Сохранить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          <span className="mr-2">Вспомнили пароль?</span>
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
