import React, { useEffect } from 'react';
import styles from './feed.module.css';

import OrdersStat from '../../components/orders-stat/orders-stat';
import Orders from '../../components/orders/orders';

import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { closeFeedConnection, initFeed } from '../../services/store/slices/feed';

const text = {
  errorMessage: 'В приложении произошла ошибка. Пожалуйста, перезагрузите страницу',
  errorTitle: 'Что-то пошло не так :(',
  pageTitle: 'Лента заказов',
};

export const FeedPage = () => {
  const { data } = useAppSelector(state => state.feed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initFeed());

    return () => {
      dispatch(closeFeedConnection());
    };
  }, []);

  if (!data?.orders.length) return null;

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large pt-10 pb-5">
        {text.pageTitle}
      </h1>
      <div className={styles.content}>
        <Orders orders={data.orders} />
        <OrdersStat />
      </div>
    </main>
  );
};
