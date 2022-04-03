import React from 'react';
import styles from './ingredient.module.css';

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export const IngredientPage = () => (
  <main className={`${styles.main} pt-30`}>
    <h1 className="text text_type_main-large">
      Детали ингредиента
    </h1>
    <IngredientDetails />
  </main>
);
