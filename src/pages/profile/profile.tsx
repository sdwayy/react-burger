import React, { useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './profile.module.css';

import Nav from './nav';
import Form from './form';
import SectionDescription from './section-description';
import Orders from '../../components/orders/orders';

import { useAppSelector } from '../../utils/hooks';

export const ProfilePage = () => {
  const {
    data: userOrders,
  } = useAppSelector(state => state.userOrders);

  const reversedData = useMemo(() => userOrders?.slice().reverse(), [userOrders]);

  return (
    <main className="pl-4 pt-30">
      <section className={styles.container}>
        <div>
          <Nav />
          <SectionDescription />
        </div>
        <Switch>
          <Route path="/profile/orders">
            {reversedData && <Orders orders={reversedData} withStatus />}
          </Route>
          <Route path="/profile" exact>
            <Form />
          </Route>
        </Switch>
      </section>
    </main>
  );
};
