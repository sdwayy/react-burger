import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import OrderItemContent from './order-item-content';
import Modal from '../modal/modal';

import { orderPropTypes } from '../../utils/propTypes';
import OrderDetails from '../order-details/order-details';

import orderData from '../../mocks/orderData';

const text = {
  up: 'верх',
  down: 'низ',
  createOrder: 'Оформить заказ',
  orderCreationErrorMessage: 'Что-то пошло не так :( Попробуйте еще раз.',
};

const BurgerConstructor = props => {
  const {
    order,
    removeFilling,
    createNewOrder,
  } = props;

  const [orderModalIsVisible, setOrderModalVisibility] = React.useState(null);
  const [orderId, setOrderId] = React.useState(null);
  const [orderCreationError, setOrderCreationError] = React.useState(null);

  const { bun, filling } = order;

  const bunIsExist = Object.keys(bun).length > 0;

  const closeModal = () => {
    setOrderModalVisibility(false);

    if (orderId) {
      setOrderId(null);
    }
  };

  const openModal = () => {
    setOrderModalVisibility(true);
  };

  const createOrder = () => new Promise(resolve => {
    setTimeout(() => {
      resolve(orderData);
    }, 1000)
  });

  const onCreateOrderBtnClick = () => {
    createOrder()
      .then(response => {
        setOrderId(response.id);
        createNewOrder();
      })
      .catch(() => {
        setOrderCreationError(true);
      })
      .finally(() => {
        openModal();
      });
  };

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
      <li key={index} className={`${styles['order-item']} mb-4`}>
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
          <div className={`${styles['order-item']} mb-4 pl-8 pr-4`}>
            <OrderItemContent
              type="top"
              isLocked={true}
              text={`${bun.name}\n(${text.up})`}
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
          <div className={`${styles['order-item']} mt-4 mb-10 pl-8 pr-4`}>
            <OrderItemContent
              type="bottom"
              isLocked={true}
              text={`${bun.name}\n(${text.down})`}
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
        <Button
          type="primary"
          size="large"
          disabled={orderSum === 0}
          onClick={onCreateOrderBtnClick}
        >
          {text.createOrder}
        </Button>
      </footer>
      {
        orderModalIsVisible
        && (
          <Modal closeModal={closeModal} className={styles['order-modal']}>
            {
              orderCreationError
                ? <p className="text text_type_main-default">{text.orderCreationErrorMessage}</p>
                : <OrderDetails id={orderId} />
            }
          </Modal>
        )
      }
    </section>
  );
};

BurgerConstructor.propTypes = {
  order: orderPropTypes.isRequired,
  removeFilling: PropTypes.func.isRequired,
  createNewOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
