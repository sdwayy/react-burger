import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient.module.css';

import { fetchIngredients } from '../../services/store/slices/ingredients';

import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export const IngredientPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, list } = useSelector(state => state.ingredients);

  useEffect(() => {
    if (!isLoading && !list.length) {
      dispatch(fetchIngredients());
    }
  }, [])

  return (
    <main className={`${styles.main} pt-30`}>
      <h1 className="text text_type_main-large">
        Детали ингредиента
      </h1>
      { !isLoading && <IngredientDetails id={+id} /> }
    </main>
  );
};
