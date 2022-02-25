import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredients from './ingredients';

import { burgerPropTypes, ingredientListPropTypes } from '../../utils/propTypes';

const BurgerIngredients = props => {
  const {
    burger,
    ingredients,
    setBun,
    addFilling,
  } = props;

  const [currentTab, setCurrurentTab] = React.useState('buns')

  const onBunIngredientClick = bunData => setBun(bunData);
  const onSauceIngredientClick = sauceData => addFilling(sauceData);
  const onFillingIngredientClick = fillingData => addFilling(fillingData);

  return (
    <section className={styles.container}>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrurentTab}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrurentTab}>
          Соусы
        </Tab>
        <Tab value="fillings" active={currentTab === 'fillings'} onClick={setCurrurentTab}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.list} ${styles['ingredients-list']}`}>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <Ingredients
            burger={burger}
            itemsData={ingredients.filter(i => i.type === 'bun')}
            onIngredientClick={onBunIngredientClick}
          />
        </li>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <Ingredients
            burger={burger}
            itemsData={ingredients.filter(i => i.type === 'sauce')}
            onIngredientClick={onSauceIngredientClick}
          />
        </li>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">Начинки</h2>
          <Ingredients
            burger={burger}
            itemsData={ingredients.filter(i => i.type === 'main')}
            onIngredientClick={onFillingIngredientClick}
          />
        </li>
      </ul>
    </section>
  );
};

BurgerIngredients.propTypes = {
  burger: burgerPropTypes.isRequired,
  ingredients: ingredientListPropTypes.isRequired,
  setBun: PropTypes.func.isRequired,
  addFilling: PropTypes.func.isRequired,
};

export default BurgerIngredients;
