import React, { useMemo } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../utils/hooks';

import { useHistory, useLocation } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import styles from './burger-constructor.module.css';

import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientCardContent from './ingredient-card-content';
import Modal from '../modal/modal';
import CreatedOrder from '../created-order/created-order';
import BurgerFillingCard from './burger-filling-card';

import {
  fetchOrder,
  setBun,
  addFilling,
  removeFilling,
  moveFilling,
  toggleError,
} from '../../services/store/slices/currentOrder/currentOrder';
import { resetCreatedOrder } from '../../services/store/slices/createdOrder/createdOrder';
import { TIngredient } from '../../utils/types';
import { calculateBurgerPrice } from '../../services/utils';

const text = {
  up: 'верх',
  down: 'низ',
  createOrder: 'Оформить заказ',
  orderCreationErrorMessage: 'Что-то пошло не так :( Попробуйте еще раз.',
  createInProgress: 'Оформляем...',
};

type TDropItem = {
  id: string;
};

const BurgerConstructor = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {
    currentOrder,
    ingredients,
    createdOrder,
    auth: {
      user,
    },
  } = useAppSelector(state => state);

  const {
    bun,
    filling,
    hasError,
    isLoading
  } = currentOrder;

  const burgerIngredients = useMemo(() =>  {
    const items = [...filling];

    if (bun) {
      items.push(bun);
      items.push(bun);
    };

    return items;
  }, [bun, filling]);

  const price = useMemo(() => calculateBurgerPrice(burgerIngredients), [burgerIngredients]);

  const [, dropRef] = useDrop<TDropItem>({
    accept: 'ingredient',
    drop({ id }) {
      const itemData = ingredients.list.find(({ _id }) =>  _id === id);

      if (itemData) {
        if (itemData.type === 'bun') {
          dispatch(setBun(itemData));
        } else {
          dispatch(addFilling(itemData));
        }
      }
    },
  });

  const closeModal = () => {
    if (hasError) {
      dispatch(toggleError());
    }
    dispatch(resetCreatedOrder());
  };

  const onCreateOrderBtnClick = () => {
    if (!user) {
      history.push({
        pathname: '/login',
        state: {
          from: location,
        },
      });

      return;
    }

    dispatch(fetchOrder(currentOrder));
  };

  const handleRemoveFillingItem = (itemData: TIngredient) => {
    dispatch(removeFilling(itemData));
  };

  const handleMoveFillingItem = (currentIndex: number, newIndex: number) => {
    dispatch(moveFilling({currentIndex, newIndex}));
  };

  return (
    <section className={`${styles.container} pl-4`} ref={dropRef} data-testid="constructor">
      <div className={styles.ingredients}>
        {
          bun
          && (
            <div
              className={`${styles['order-item']} mb-4 pl-8 pr-4`}
              data-testid="orderItem"
              data-type={bun.type}
            >
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
            <div 
              className={`${styles['order-item']} mt-4 pl-8 pr-4`} 
              data-testid="orderItem"
              data-type={bun.type}
            >
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
      </div>
      <footer className="pr-4 mt-10">
        {price && (
          <p className={`${styles.sum} mr-10`} data-testid="orderPrice">
            <span className="text text_type_digits-medium mr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </p>
        )}
        <Button
          type="primary"
          size="large"
          disabled={price === 0 || !bun || isLoading}
          onClick={onCreateOrderBtnClick}
        >
          <span data-testid="createOrderBtn">
            {isLoading ? text.createInProgress : text.createOrder}
          </span>
        </Button>
      </footer>
      {
        (createdOrder.hasOwnProperty('number') || hasError)
        && (
          <Modal closeModal={closeModal} className={styles['order-modal']}>
            {
              hasError
                ? <p className="text text_type_main-default">{text.orderCreationErrorMessage}</p>
                : <CreatedOrder />
            }
          </Modal>
        )
      }
    </section>
  );
};

export default BurgerConstructor;
