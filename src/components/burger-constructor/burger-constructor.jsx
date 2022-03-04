import React, {
  useContext,
  useState,
} from 'react';
import styles from './burger-constructor.module.css';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import OrderItemContent from './order-item-content';
import Modal from '../modal/modal';

import OrderDetails from '../order-details/order-details';

import { orderContext } from '../../services/orderContext';

const ORDERS_URL = 'https://norma.nomoreparties.space/api/orders';

const text = {
  up: 'верх',
  down: 'низ',
  createOrder: 'Оформить заказ',
  orderCreationErrorMessage: 'Что-то пошло не так :( Попробуйте еще раз.',
};

const BurgerConstructor = () => {
  const [orderModalIsVisible, setOrderModalVisibility] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [orderCreationError, setOrderCreationError] = useState(null);

  const { orderState, orderDispatcher } = useContext(orderContext)
  const { bun, filling, price } = orderState;

  const closeModal = () => {
    setOrderModalVisibility(false);

    if (orderId) {
      setOrderId(null);
    }
  };

  const openModal = () => {
    setOrderModalVisibility(true);
  };

  const fetchOrder = () => {
    const ingredientIds = [
      bun._id,
      ...filling.map(i => i._id),
    ];

    const body = JSON.stringify({
      ingredients: ingredientIds,
    })

    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body,
    };

    return fetch(ORDERS_URL, data)
      .then(response => response.json());
  };

  const onCreateOrderBtnClick = () => {
    fetchOrder()
      .then(response => {
        const {
          success,
          order,
        } = response;

        if (!success) {
          setOrderCreationError(true);
          return null;
        }

        setOrderId(order.number);
        orderDispatcher({ type: 'resetOrder' });
      })
      .catch((e) => {
        setOrderCreationError(true);
      })
      .finally(() => {
        openModal();
      });
  };

  const fillingElements = filling.map((i, index) => {
    const {
      name,
      price,
      image_mobile,
    } = i;

    const handleClose = () => orderDispatcher({
      type: 'removeFilling',
      payload: { index },
    });

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
        bun
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
        bun
        && (
          <div className={`${styles['order-item']} mt-4 pl-8 pr-4`}>
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
      <footer className="pr-4 mt-10">
        <p className={`${styles.sum} mr-10`}>
          <span className="text text_type_digits-medium mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="large"
          disabled={price === 0 || !bun}
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

export default BurgerConstructor;
