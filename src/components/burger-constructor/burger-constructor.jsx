import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import OrderItemContent from './order-item-content';

import { burgerPropTypes } from '../../utils/propTypes';

const BurgerConstructor = props => {
  const {
    burger,
    removeFilling,
  } = props;

  const { bun, filling } = burger;
  
  const bunIsExist = Object.keys(bun).length > 0;

  const getOrderSum = () => {
    if (!bunIsExist && !filling.length) {
      return 0;
    }

    if (!filling.length) {
      return bun.price * 2;
    }

    const getFillingPrice = () => filling.reduce((acc, i) => acc + i.price, 0);

    if (!bunIsExist) {
      return getFillingPrice();
    }

    return bun.price * 2 + getFillingPrice();
  };

  const orderSum = getOrderSum();

  const fillingElements = filling.map((i, index) => {
    const {
      name,
      price,
      image_mobile,
    } = i;

    const handleClose = () => removeFilling(index);

    return (
      <li key={index} className={styles['order-item']}>
        <OrderItemContent
          text={name}
          price={price}
          thumbnail={image_mobile}
          handleClose={handleClose}
          dragable={true}
        />
      </li>
    )
  });

  return (
    <section className={`${styles.container} pl-4`}>
      {
        bunIsExist
        && (
          <div className={`${styles['order-item']} pl-8 pr-4`}>
            <OrderItemContent
              type="top"
              isLocked={true}
              text={`${bun.name}\n(верх)`} 
              price={bun.price}
              thumbnail={bun.image_mobile} 
            />
          </div>
        )
      }
      <ul className={`${styles['filling-list']} pr-2`}>
        {fillingElements}
      </ul>
      {
        bunIsExist
        && (
          <div className={`${styles['order-item']} mb-10 pl-8 pr-4`}>
            <OrderItemContent
              type="bottom"
              isLocked={true}
              text={`${bun.name}\n(низ)`} 
              price={bun.price}
              thumbnail={bun.image_mobile} 
            />
          </div>
        )
      }
      <footer className="pr-4">
        <p className={`${styles.sum} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{orderSum}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large" disabled={orderSum === 0}>
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};

BurgerConstructor.propTypes = {
  burger: burgerPropTypes.isRequired,
  removeFilling: PropTypes.func.isRequired,
};

export default BurgerConstructor;
