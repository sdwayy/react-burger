import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './profile.module.css';

import Nav from './nav';
import Form from './form';
import SectionDescription from './section-description';
import UserOrders from './user-orders';

export const ProfilePage = () => (
  <main className="pl-4 pt-30">
    <section className={styles.container}>
      <div>
        <Nav />
        <SectionDescription />
      </div>
      <Switch>
        <Route path="/profile/orders">
          <UserOrders />
        </Route>
        <Route path="/profile" exact>
          <Form />
        </Route>
      </Switch>
    </section>
  </main>
);
