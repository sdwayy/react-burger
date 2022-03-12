import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import styles from './burger-ingredients.module.css';

import { ingredientPropTypes } from '../../utils/prop-types';

import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ data, onIngredientClick }) => {
  const { 
    image,
    name,
    price,
    _id,
  } = data;
  const { bun, filling } = useSelector(state => state.currentOrder);
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
      onClick={() => onIngredientClick(data)}
      ref={ref}
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
    </li>
  );
};

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default Ingredient;
