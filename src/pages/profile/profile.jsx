import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import styles from './profile.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import NavItem from '../../components/nav-item';
import { patchUser } from '../../services/store/slices/auth';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const currentUserData = {
    ...user,
    password: '',
  };

  const [formData, setFormData] = useState(currentUserData);
  const [activeInput, setActiveInput] = useState(null);

  const formHasChanges = Object
    .entries(formData)
    .some(([key, value]) => value !== currentUserData[key]);

  const onInputChange = e => {
    const { name, value } = e.target;
    const currentValue = formData[name];

    if (currentValue !== value) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onInputFocus = e => {
    setActiveInput(e.target.name);
  };

  const onInputBlur = () => {
    setActiveInput(null);
  };

  const onCancelBtnClick = e => {
    e.preventDefault();
    setFormData(currentUserData);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(patchUser(formData))
  };

  return (
    <main className="pl-4 pt-30">
      <section className={styles.container}>
        <nav className={`${styles.nav} mr-15`}>
          <NavItem
            className={styles['nav-item']}
            title="Профиль"
            path="/profile"
            exact={true}
            textType="medium"
          />
          <NavItem
            className={styles['nav-item']}
            title="История заказов"
            path="/profile/orders"
            exact={true}
            textType="medium"
          />
          <NavItem
            className={styles['nav-item']}
            title="Выход"
            path="/logout"
            textType="medium"
          />
        </nav>
        <Switch>
          <Route path="/profile" exact>
            <form
              className={`form ${activeInput || formHasChanges ? '' : 'pb-20'}`}
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
                (activeInput || formHasChanges)
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
          </Route>
        </Switch>
      </section>
      <p className={`${styles['section-description']} text text_type_main-default text_color_inactive`}>
        <Switch>
          <Route path="/profile" exact>
            В этом разделе вы можете <br /> изменить свои персональные данные
          </Route>
        </Switch>
      </p>
    </main>
  );
};
