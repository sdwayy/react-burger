import React from 'react';
import styles from './profile.module.css';

import NavItem from '../../components/nav-item/nav-item';

const Nav = () => (
  <nav className={`${styles.nav} mr-15 mb-20`}>
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
);

export default Nav;
