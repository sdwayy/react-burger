import React from 'react';
import styles from './orders.module.css';

import OrderCard from '../order-card/order-card';
import { TFeedOrder } from '../../utils/types';

type TOrdersProps = {
  withStatus?: boolean;
  orders: TFeedOrder[];
};

const Orders: React.FC<TOrdersProps> = ({
  orders,
  withStatus,
}) => (
  <section className={`${styles.orders} pr-2 pb-10`}>
    {
      orders.map(order => <OrderCard key={order._id} {...order} withStatus={withStatus} />)
    }
  </section>
);

export default Orders;
