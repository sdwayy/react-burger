import React, { useEffect, useState } from 'react';

import styles from './order-details.module.css';

import { useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';

import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { calculateBurgerPrice } from '../../services/utils';
import { TFeedOrder, TIngredient } from '../../utils/types';
import routes from '../../routes';

type TMatchParams = {
  number: string,
};

const OrderDetails = () => {
  const feedOrderMatcher = useRouteMatch<TMatchParams>('/feed/:number');
  const userOrderMatcher = useRouteMatch<TMatchParams>('/profile/orders/:number');
  const match = userOrderMatcher || feedOrderMatcher;

  const { list: ingredients } = useAppSelector(state => state.ingredients);
  const { data: userOrders } = useAppSelector(state => state.userOrders);
  const feedOrders = useAppSelector(state => state.feed.data?.orders);
  const orders = (feedOrderMatcher && feedOrders) || (userOrderMatcher && userOrders);

  const [order, setOrder] = useState<null | TFeedOrder>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const number = match?.params?.number;

  useEffect(() => {
    if (number) {
      let currentOrder: TFeedOrder | null = null;

      if (orders && orders.length) {
        currentOrder = orders.find(order => order.number === +number) as TFeedOrder;
      }

      if (currentOrder) {
        setOrder(currentOrder);
      } else {
        fetch(`${routes.orders}/${number}`)
          .then(res => {
            setHasError(false);
            return res.json();
          })
          .then(({ orders }) => {
            setOrder(orders[0]);
          })
          .catch(e => {
            setHasError(true);
          });
      }
    }
  }, []);

  if (!ingredients || !order) return null;

  const {
    createdAt,
    name,
    ingredients: ingredientsIds,
    status,
  } = order;

  const formattedStatus = status === 'done' ? 'Выполнен' : 'В работе';
  const ingredientsData = ingredientsIds
    .map(id => ingredients.find(({ _id }) => id === _id))
    .filter(i => i) as TIngredient[];

  const price = calculateBurgerPrice(ingredientsData);
  const uniqIngredientsId = Array.from(new Set(ingredientsIds));

  return (
    <div className={styles.container}>
      <p className={`${styles.number} mb-10 text text_type_digits-default`}>
        #{number}
      </p>
      <p className={`${styles.name} mb-3 text text_type_main-medium`}>
        {name}
      </p>
      <p className={`${styles.status} mb-15 text text_type_main-default`} data-status={status}>
        {formattedStatus}
      </p>
      <p className="mb-6 text text_type_main-medium">
        Состав:
      </p>
      <div className={`${styles.ingredients} mb-10 pr-6`}>
        {
          uniqIngredientsId.map((id, index) => {
            const ingredientData = ingredientsData.find(({ _id }) => id === _id);
            const count = ingredientsData.filter(({ _id }) => id === _id).length;

            return (
              <div key={index} className={`${styles.ingredient} mb-4`}>
                <div className={`${styles['ingredient-icon']} mr-4`}>
                  <img src={ingredientData?.image} alt="ingredient icon" width="112" height="56" />
                </div>
                <p className={`${styles['ingredient-name']} text text_type_main-default`}>
                  {ingredientData?.name}
                </p>
                <p className={`${styles['ingredient-price']} text text_type_digits-default`}>
                  <span className="mr-2">
                    {
                      `${count} x ${ingredientData?.price}`
                    }
                  </span>
                  <CurrencyIcon type="primary" />
                </p>
              </div>
            );
          })
        }
      </div>
      <span className={`${styles.date} text text_type_main-default text_color_inactive`}>
        {createdAt}
      </span>
      <p className={`${styles.price} text text_type_digits-default`}>
        <span className="mr-2">{price}</span>
        <CurrencyIcon type='primary' />
      </p>
    </div>
  );
};

export default OrderDetails;
