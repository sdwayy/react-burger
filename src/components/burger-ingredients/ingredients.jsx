import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import IngredientCardContent from './ingredient-card-content';

import { burgerPropTypes, ingredientListPropTypes } from '../../utils/propTypes';

const Ingredients = props => {
  const {
    burger,
    itemsData,
    onIngredientClick,
  } = props;

  const { bun, filling } = burger;

  const getCountInBurger = (type, _id) => {
    if (type === 'bun') {
      return bun && bun._id === _id ? 1 : 0;
    }

    const count = filling.length > 0 
      ? filling.reduce((acc, i) => i._id === _id ? acc + 1 : acc, 0)
      : 0;

    return count;
  };

  return (
    <ul className={`${styles.list} ${styles['ingredients-card-list']} pl-4 pr-4`}>
      {
        itemsData.map(itemData => {
          const { image, name, price, _id } = itemData;

          return (
            <li className={styles['ingredients-card']} key={_id} onClick={() => onIngredientClick(itemData)}>
              <IngredientCardContent
                src={image}
                title={name}
                price={price}
                count={getCountInBurger(itemData.type, itemData._id)}
              />
            </li>
          );
        })
      }
    </ul>
  );
};

Ingredients.propTypes = {
  burger: burgerPropTypes.isRequired,
  itemsData: ingredientListPropTypes.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default Ingredients;
