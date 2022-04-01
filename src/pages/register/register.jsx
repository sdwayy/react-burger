import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/store/slices/auth';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = event => {
    event.preventDefault();
    dispatch(register(formData));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <main className="form-page">
      <div className="form-container">
        <h1 className="text text_type_main-medium">
          Регистрация
        </h1>
        <form className="form pt-6 pb-20" onSubmit={onFormSubmit}>
          <Input
            type="text"
            onChange={onChange}
            value={formData.name}
            name="name"
            placeholder='Имя'
          />
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
            size="default"
          />
          <Button
            primary={true}
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          <span className='mr-2'>Уже зарегистрированы?</span>
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
