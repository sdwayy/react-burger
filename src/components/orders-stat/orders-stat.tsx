import React from 'react';
import { useAppSelector } from '../../utils/hooks';

import styles from './orders-stat.module.css';

const MAX_ORDERS_IN_STAT = 5;

const OrdersStat = () => {
  const { data } = useAppSelector(state => state.feed)

  if (!data) return null;

  const {
    total,
    totalToday,
    orders,
  } = data;

  const readyOrders = orders
    .filter(({ status }) => status === 'done')
    .map(({ number }) => number);

  const inProgressOrders = orders
    .filter(({ status }) => status === 'created' || status === 'pending')
    .map(({ number }) => number);

  return (
    <section className={styles.container}>
      <div className={`${styles['ready-orders']} text text_type_main-medium mb-15`}>
        <h2 className="mb-6">Готовы:</h2>
        {
          readyOrders
            .slice(0, MAX_ORDERS_IN_STAT)
            .map(number => (
              <p key={number} className={`${styles['ready-order']} text text_type_digits-default`}>
                {number}
              </p>
            ))
        }
      </div>
      <div className={`${styles['in-progress-orders']} text text_type_main-medium mb-15`}>
        <h2 className="mb-6">В работе:</h2>
        {
          inProgressOrders
            .slice(0, MAX_ORDERS_IN_STAT)
            .map(number => (
              <p key={number} className="text text_type_digits-default">
                {number}
              </p>
            ))
        }
      </div>
      <div className={`${styles['all-the-time-stat']} text text_type_main-medium mb-15`}>
        <h2>Выполнено за всё время:</h2>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div className={`${styles['today-stat']} text text_type_main-medium`}>
        <h2>Выполнено за сегодня:</h2>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </section>
  );
};

export default OrdersStat;
