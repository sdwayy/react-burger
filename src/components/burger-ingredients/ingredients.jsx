import React from 'react';
import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';

import Ingredient from './ingredient';
import { ingredientListPropTypes } from '../../utils/prop-types';

const Ingredients = ({ itemsData, onIngredientClick }) => (
  <ul className={`${styles.list} ${styles['ingredients-card-list']} pl-4 pr-4`}>
    {
      itemsData.map(itemData => (
        <Ingredient
          data={itemData}
          onIngredientClick={onIngredientClick}
          key={itemData._id}
        />
      ))
    }
  </ul>
);

Ingredients.propTypes = {
  itemsData: ingredientListPropTypes.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default Ingredients;
