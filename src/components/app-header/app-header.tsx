import React from 'react';
import styles from './app-header.module.css';

import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import NavItem from '../nav-item/nav-item';

const text = {
  constructor: 'Конструктор',
  orderFeed: 'Лента заказов',
  profile: 'Личный кабинет',
};

const Header = () => {
  return (
    <header className={`pt-3 pb-3 ${styles.header}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavItem
            className={`${styles['nav-item']} pt-5 pr-4 pb-5 pl-4`}
            title={text.constructor}
            Icon={BurgerIcon}
            path="/"
            exact={true}
          />
          <NavItem
            className={`${styles['nav-item']} pt-5 pr-4 pb-5 pl-4`}
            title={text.orderFeed}
            Icon={ListIcon}
            path="/feed"
          />
        </nav>
        <Logo />
        <NavItem
          className={`${styles['nav-item']} pt-5 pr-4 pb-5 pl-4`}
          title={text.profile}
          Icon={ProfileIcon}
          path="/profile"
        />
      </div>
    </header>
  );
}
export default Header;
