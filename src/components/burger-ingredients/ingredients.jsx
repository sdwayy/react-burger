import React from 'react';
import styles from './burger-ingredients.module.css';

import Ingredient from './ingredient';
import { ingredientListPropTypes } from '../../utils/prop-types';

const Ingredients = ({ itemsData }) => (
  <ul className={`${styles.list} ${styles['ingredients-card-list']} pl-4 pr-4`}>
    {
      itemsData.map(itemData => (
        <Ingredient
          data={itemData}
          key={itemData._id}
        />
      ))
    }
  </ul>
);

Ingredients.propTypes = {
  itemsData: ingredientListPropTypes.isRequired,
};

export default Ingredients;
