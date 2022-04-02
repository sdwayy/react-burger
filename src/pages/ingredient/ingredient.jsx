import React, { useEffect } from 'react';
import { setActiveIngredient } from '../../services/store/slices/activeIngredient';
import { useParams } from 'react-router-dom';
import styles from './ingredient.module.css';

import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from 'react-redux';

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.ingredients);
  const { id } = useParams();

  useEffect(() => {
    if (list.length) {
      const ingredientData = list.find(({ _id }) => _id === id);
      dispatch(setActiveIngredient(ingredientData));
    }
  }, [dispatch, id, list]);

  return (
    <main className={`${styles.main} pt-30`}>
      <h1 className="text text_type_main-large">
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </main>
  );
};
