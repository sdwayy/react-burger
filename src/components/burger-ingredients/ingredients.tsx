import React from 'react';
import styles from './burger-ingredients.module.css';

import Ingredient from './ingredient';
import { TIngredient } from '../../utils/types';

type TIngredientsProps = {
  itemsData: TIngredient[];
};

const Ingredients: React.FC<TIngredientsProps> = ({ itemsData }) => (
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

export default Ingredients;
