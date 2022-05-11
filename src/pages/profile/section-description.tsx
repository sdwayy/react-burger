import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './profile.module.css';

const SectionDescription = () => (
  <p className={`${styles['section-description']} text text_type_main-default text_color_inactive`}>
    <Switch>
      <Route path="/profile/orders">
        В этом разделе вы можете <br /> просмотреть свою историю заказов
      </Route>
      <Route path="/profile" exact>
        В этом разделе вы можете <br /> изменить свои персональные данные
      </Route>
    </Switch>
  </p>
);

export default SectionDescription;
