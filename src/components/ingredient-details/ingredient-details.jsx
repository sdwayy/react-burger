import React from "react";
import styles from './ingredient-details.module.css';

import { ingredientPropTypes } from '../../utils/propTypes';

const text = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углводы, г',
};

const IngredientDetails = props => {
  const {
    ingredientData,
  } = props;

  const {
    calories,
    carbohydrates,
    fat,
    image_large,
    name,
    proteins,
  } = ingredientData;

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

IngredientDetails.propTypes = {
  ingredientData: ingredientPropTypes.isRequired,
};

export default IngredientDetails;
