import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import IngredientCardContent from './ingredient-card-content';

import { orderContext } from '../../services/orderContext';

import { ingredientListPropTypes } from '../../utils/propTypes';

const Ingredients = ({
  itemsData,
  onIngredientClick,
}) => {
  const { orderState } = useContext(orderContext);
  const { bun, filling } = orderState;

  const getCountInBurger = (type, _id) => {
    if (type === 'bun') {
      return bun?._id === _id ? 1 : 0;
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
          const {
            image,
            name,
            price,
            _id,
            type,
          } = itemData;
          const uniqKey = `${_id}-${+new Date()}`

          return (
            <li className={styles['ingredients-card']} key={uniqKey} onClick={() => onIngredientClick(itemData)}>
              <IngredientCardContent
                src={image}
                title={name}
                price={price}
                count={getCountInBurger(type, _id)}
              />
            </li>
          );
        })
      }
    </ul>
  );
};

Ingredients.propTypes = {
  itemsData: ingredientListPropTypes.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default Ingredients;
