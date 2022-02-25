import React from 'react';
import styles from './header.module.css';

import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Header = () => (
  <header className={`pt-3 pb-3 ${styles.header}`}>
    <div className={styles.container}>
      <nav>
        <ul className={styles.nav}>
          <li className="mr-2">
            <a
              className={`text text_type_main-default pt-5 pr-4 pb-5 pl-4 ${styles.link}`}
              href="/"
            >
              <BurgerIcon type="primary" />
              <span className="ml-2">Конструктор</span>
            </a>
          </li>
          <li>
            <a
              className={`text text_type_main-default text_color_inactive pt-5 pr-4 pb-5 pl-4 ${styles.link} ${styles['link--disabled']}`}
              href="/"
            >
              <ListIcon type="secondary" />
              <span className="ml-2">Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <Logo />
      <a
        className={`text text_type_main-default text_color_inactive pt-5 pr-4 pb-5 pl-4 ${styles.link} ${styles['link--disabled']}`}
        href="/"
      >
        <ProfileIcon type="secondary" />
        <span className="ml-2">Личный кабинет</span>
      </a>
    </div>
  </header>
);

export default Header;
