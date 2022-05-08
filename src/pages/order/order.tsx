import React from 'react';
import styles from './order.module.css';

import OrderDetails from "../../components/order-details/order-details";

export const OrderPage = () => (
  <main className={`${styles.main} pt-30`}>
    <OrderDetails />
  </main>
);
