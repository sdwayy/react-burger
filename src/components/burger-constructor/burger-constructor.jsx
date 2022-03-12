import React, { useMemo } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useDrop } from 'react-dnd';

import styles from './burger-constructor.module.css';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientCardContent from './ingredient-card-content';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerFillingCard from './burger-filling-card';

import {
  fetchOrder,
  setBun,
  addFilling,
  removeFilling,
  moveFilling,
  toggleError,
} from '../../services/store/slices/currentOrder';
import { setCreatedOrder } from '../../services/store/slices/createdOrder';

const text = {
  up: 'верх',
  down: 'низ',
  createOrder: 'Оформить заказ',
  orderCreationErrorMessage: 'Что-то пошло не так :( Попробуйте еще раз.',
};

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { currentOrder, ingredients, createdOrder } = useSelector(state => state);
  const { bun, filling, hasError } = currentOrder;

  const orderPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    return filling.reduce((acc, { price }) =>  acc + price, bunPrice);
  }, [bun, filling]);

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop({ id }) {
      const itemData = ingredients.list.find(({ _id }) =>  _id === id);

      if (itemData.type === 'bun') {
        dispatch(setBun(itemData));
      } else {
        dispatch(addFilling(itemData));
      }
    },
  });

  const closeModal = () => {
    if (hasError) {
      dispatch(toggleError());
    }
    dispatch(setCreatedOrder(null));
  };

  const onCreateOrderBtnClick = () => {
    dispatch(fetchOrder(currentOrder));
  };

  const handleRemoveFillingItem = itemData => {
    dispatch(removeFilling(itemData));
  };

  const handleMoveFillingItem = (currentIndex, newIndex) => {
    dispatch(moveFilling({currentIndex, newIndex}));
  };

  return (
    <section className={`${styles.container} pl-4`} ref={dropRef}>
      {
        bun
        && (
          <div className={`${styles['order-item']} mb-4 pl-8 pr-4`}>
            <IngredientCardContent
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
        {
          filling.map((itemData, index) => (
            <BurgerFillingCard
              data={itemData}
              handleRemove={handleRemoveFillingItem}
              handleMove={handleMoveFillingItem}
              key={itemData.key}
              index={index}
            />
          ))
        }
      </ul>
      {
        bun
        && (
          <div className={`${styles['order-item']} mt-4 pl-8 pr-4`}>
            <IngredientCardContent
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
          <span className="text text_type_digits-medium mr-2">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="large"
          disabled={orderPrice === 0 || !bun}
          onClick={onCreateOrderBtnClick}
        >
          {text.createOrder}
        </Button>
      </footer>
      {
        (createdOrder || hasError)
        && (
          <Modal closeModal={closeModal} className={styles['order-modal']}>
            {
              hasError
                ? <p className="text text_type_main-default">{text.orderCreationErrorMessage}</p>
                : <OrderDetails />
            }
          </Modal>
        )
      }
    </section>
  );
};

export default BurgerConstructor;
