import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './order-card.module.css';

import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../utils/hooks';
import { TFeedOrder, TIngredient } from '../../utils/types';
import { calculateBurgerPrice } from '../../services/utils';

const MAX_INGREDIENTS_IN_CARD = 5;

const orderStatuses = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
} as const;

type TOrderCardProps = {
  withStatus?: boolean;
} & TFeedOrder;

const OrderCard: React.FC<TOrderCardProps> = ({
  name,
  number,
  ingredients: orderIngredientIds = [],
  createdAt,
  _id,
  status,
  withStatus,
}) => {
  const location = useLocation();
  const { pathname } = location;

  const ingredients = useAppSelector(state => state.ingredients.list);

  const orderIngredientsData = useMemo(
    () => orderIngredientIds.map(id => ingredients.find(({ _id }) => _id === id)),
    [orderIngredientIds, ingredients],
  ) as TIngredient[] ;

  const price = useMemo(
    () => calculateBurgerPrice(orderIngredientsData),
    [orderIngredientsData],
  );

  const withCounter = orderIngredientsData.length > MAX_INGREDIENTS_IN_CARD;

  return (
    <Link
      className={`${styles.container} p-6`}
      to={{
        pathname: `${pathname}/${_id}`,
        state: { background: location },
      }}
      data-with-counter={withCounter}
    >
      <span className={`${styles.number} text text_type_digits-default mb-6`}>
        #{number}
      </span>
      <span className={`${styles.date} text text_type_main-default text_color_inactive mb-6`}>
        {createdAt}
      </span>
      <span className={`${styles.name} text text_type_main-medium ${withStatus ? 'mb-2' : 'mb-6'}`}>
        {name}
      </span>
      { withStatus && (
          <span
            className={`${styles.status} text text_type_main-default mb-6`}
            data-status={status}
          >
            {orderStatuses[status]}
          </span>
        )
      }
      <ul className={styles.ingredients}>
        {
          orderIngredientsData.slice(0, MAX_INGREDIENTS_IN_CARD + 1).map((i, index, arr) => (
            <li
              key={index}
              className={styles['ingredient-icon']}
              style={{ zIndex: arr.length - index }}
            >
              <img src={i.image} alt="ingredient icon" width="112" height="56" />
              {withCounter && index === arr.length - 1 && (
                <span className={`${styles['ingredients-counter']} text text_type_main-default`}>
                  +{orderIngredientsData.length - index}
                </span>
              )}
            </li>
          ))
        }
      </ul>
      <p className={`${styles.price} text text_type_digits-default`}>
        <span className="mr-2">{price}</span>
        <CurrencyIcon type='primary' />
      </p>
    </Link>
  );
}

export default OrderCard;
