import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from 'react-router-dom';
import { setActiveIngredient } from "../../services/store/slices/activeIngredient";
import styles from './ingredient-details.module.css';

const text = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углводы, г',
};

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/ingredients/:id');
  const {
    activeIngredient,
    ingredients: {
      list,
    },
  } = useSelector(state => state);

  useEffect(() => {
    if (!activeIngredient && match) {
      const ingredient = list.find(({ _id }) => _id === match.params.id);
      dispatch(setActiveIngredient(ingredient));
    }
  }, [list, match, activeIngredient, dispatch]);

  if (!activeIngredient) return null;

  const {
    calories,
    proteins,
    image_large,
    name,
    carbohydrates,
    fat,
  } = activeIngredient;

  return (
    <>
      <img
        className="mb-4"
        src={image_large}
        alt="name"
        width="480"
        height="240"
      />
      <p className="text text_type_main-medium mb-9">
        {name}
      </p>
      <ul className={styles['nutritional-value']}>
        <li className="text text_type_main-default text_color_inactive">
          {`${text.calories}`}
          <br />
          <span className="text text_type_digits-default">{calories}</span>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          {`${text.proteins}`}
          <br />
          <span className="text text_type_digits-default">{proteins}</span>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          {`${text.fat}`}
          <br />
          <span className="text text_type_digits-default">{fat}</span>
        </li>
        <li className="text text_type_main-default text_color_inactive">
          {`${text.carbohydrates}`}
          <br />
          <span className="text text_type_digits-default">{carbohydrates}</span>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
