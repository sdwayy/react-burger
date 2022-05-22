import React, { useState } from 'react';
import styles from './profile.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { patchUser } from '../../services/store/slices/auth/auth';
import { TUserData } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

const Form = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const currentUserData: TUserData = {
    name: '',
    password: '',
    email: '',
    ...user,
  };

  const [formData, setFormData] = useState(currentUserData);
  const [activeInput, setActiveInput] = useState<null | string>(null);

  const formHasChanges = Object
    .entries(formData)
    .some(([key, value]) => value !== currentUserData[key]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentValue = formData[name];

    if (currentValue !== value) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setActiveInput(e.target.name);
  };

  const onInputBlur = () => {
    setActiveInput(null);
  };

  const onCancelBtnClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormData(currentUserData);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(patchUser(formData))
  };

  return (
    <form
      className="form"
      onSubmit={onFormSubmit}
    >
      <Input
        type="text"
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        value={formData.name}
        name="name"
        placeholder='Имя'
        icon={activeInput === 'name' ? 'CloseIcon' : 'EditIcon'}
      />
      <Input
        type="text"
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        value={formData.email}
        name="email"
        placeholder='Логин'
        icon={activeInput === 'email' ? 'CloseIcon' : 'EditIcon'}
      />
      <Input
        type="password"
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        value={formData.password}
        name="password"
        placeholder='Пароль'
        icon={activeInput === 'password' ? 'CloseIcon' : 'EditIcon'}
      />
      {
        formHasChanges
        && (
          <div className={styles['btns-container']}>
            <Button type="secondary" onClick={onCancelBtnClick}>
              Отмена
            </Button>
            <Button type="primary">
              Сохранить
            </Button>
          </div>
        )
      }
    </form>

  );
};

export default Form;
