import React from 'react';
import styles from './feed.module.css';

import OrdersStat from '../../components/orders-stat/orders-stat';
import Orders from '../../components/orders/orders';

import { useAppSelector } from '../../utils/hooks';

const text = {
  errorMessage: 'В приложении произошла ошибка. Пожалуйста, перезагрузите страницу',
  errorTitle: 'Что-то пошло не так :(',
  pageTitle: 'Лента заказов',
};

export const FeedPage = () => {
  const {
    hasError,
    isLoading,
    data,
  } = useAppSelector(state => state.feed);

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large pt-10 pb-5">
        { hasError && text.errorTitle }
        { isLoading && 'Загрузка...' }
        { !isLoading && !hasError && text.pageTitle }
      </h1>
      {
        hasError
          ? <p className="text text_type_main-medium">{text.errorMessage}</p>
          : data && (
            <div className={styles.content}>
              <Orders orders={data.orders} />
              <OrdersStat />
            </div>
          )
      }
    </main>
  );
};
