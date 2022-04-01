import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  Redirect,
  useLocation,

} from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { signIn } from '../../services/store/slices/auth';

export const LoginPage = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const {
    isAuthorized,
    errors: {
      signIn: loginError,
    },
  } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(signIn(formData));
  };

  if (isAuthorized) {
    return <Redirect to={state?.from.pathname || '/'} />
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <h1 className="text text_type_main-medium">
          Вход
        </h1>
        <form className="form pt-6 pb-20" onSubmit={onFormSubmit}>
          <Input
            type="email"
            onChange={onChange}
            value={formData.email}
            name="email"
            placeholder='E-mail'
          />
          <PasswordInput
            onChange={onChange}
            value={formData.password}
            name="password"
          />
          {
            loginError
            && <p className="text text_type_main-default text_color_error">{loginError}</p>
          }
          <Button primary={true} size="medium">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          <span className='mr-2'>Вы новый пользователь?</span>
          <Link
            to="/register"
            className="link text text_type_main-default text_color_accent"
          >
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          <span className='mr-2'>Забыли пароль?</span>
          <Link
            to="/forgot-password"
            className="link text text_type_main-default text_color_accent"
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
};
