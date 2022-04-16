import React, { useState } from 'react';

import { Link, Redirect } from 'react-router-dom';

import {
  Input,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/store/slices/auth';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
