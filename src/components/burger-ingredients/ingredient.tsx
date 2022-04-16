import React from 'react';
import { useAppSelector } from '../../utils/hooks';
import {
  useLocation,
  Link,
} from 'react-router-dom';
import { useDrag } from 'react-dnd';

import styles from './burger-ingredients.module.css';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../utils/types';

type TIngredientProps = {
  data: TIngredient;
};

const Ingredient: React.FC<TIngredientProps> = ({ data }) => {
  const location = useLocation();

  const { 
    image,
    name,
    price,
    _id,
  } = data;

  const { bun, filling } = useAppSelector(state => state.currentOrder);

  const [, ref] = useDrag({
    type: 'ingredient',
    item: { id: _id },
  });

  const countOfIngredientInBurger = [bun, ...filling]
    .filter(ingredient => ingredient && ingredient._id === _id)
    .length;

  return (
    <li
      className={styles['ingredients-card']}
      key={_id}
      ref={ref}
    >
      <Link
        to={{
          pathname: `/ingredients/${_id}`,
          state: { background: location },
        }}
      >
        <img src={image} alt={name} />
        <p className={`${styles.price} text text_type_digits-default mb-1 mt-1`}>
          <span className="mr-2">{price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className="text text_type_main-default">{name}</p>
        {
          countOfIngredientInBurger > 0 && (
            <span className={styles.counter}>
              <Counter count={countOfIngredientInBurger} size="default" />
            </span>
          )
        }
      </Link>
    </li>
  );
};

export default Ingredient;
