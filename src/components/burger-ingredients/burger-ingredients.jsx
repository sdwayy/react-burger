import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredients from './ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { orderPropTypes, ingredientListPropTypes } from '../../utils/propTypes';

const text = {
  firstIngredientCategory: 'Булки',
  secondIngredientCategory: 'Соусы',
  thirdIngredientCategory: 'Начинки',
  ingredientDetails: 'Детали ингредиента',
};

const BurgerIngredients = props => {
  const {
    order,
    ingredients,
    setBun,
    addFilling,
  } = props;

  const [currentTab, setCurrurentTab] = React.useState('buns')
  const [ingrediebtDetailsModalIsVisible, setIngrediebtDetailsModalVisibility] = React.useState(null);
  const [activeIngredient, setActiveIngredient] = React.useState(null);

  const openIngrediebtDetailsModal = () => {
    setIngrediebtDetailsModalVisibility(true);
  };

  const closeIngrediebtDetailsModal = () => {
    setIngrediebtDetailsModalVisibility(false);
    setActiveIngredient(null);
  };

  const onIngredientClick = ingredientData => {
    setActiveIngredient(ingredientData);
    openIngrediebtDetailsModal();
  };

  const onBunIngredientClick = bunData => {
    setBun(bunData);
    onIngredientClick(bunData);
  };

  const onSauceIngredientClick = sauceData => {
    addFilling(sauceData);
    onIngredientClick(sauceData);
  };

  const onFillingIngredientClick = fillingData => {
    addFilling(fillingData);
    onIngredientClick(fillingData);
  };

  const getIngredientItemsDataByType = type => ingredients.filter(i => i.type === type);

  const bunItemsData = React.useMemo(() => getIngredientItemsDataByType('bun'), [ingredients]);
  const sauceItemsData =  React.useMemo(() => getIngredientItemsDataByType('sauce'), [ingredients]);
  const fillingItemsData = React.useMemo(() => getIngredientItemsDataByType('main'), [ingredients]);

  return (
    <section className={styles.container}>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrurentTab}>
          {text.firstIngredientCategory}
        </Tab>
        <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrurentTab}>
          {text.secondIngredientCategory}
        </Tab>
        <Tab value="fillings" active={currentTab === 'fillings'} onClick={setCurrurentTab}>
          {text.thirdIngredientCategory}
        </Tab>
      </div>
      <ul className={`${styles.list} ${styles['ingredients-list']}`}>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">{text.firstIngredientCategory}</h2>
          <Ingredients
            order={order}
            itemsData={bunItemsData}
            onIngredientClick={onBunIngredientClick}
          />
        </li>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">{text.secondIngredientCategory}</h2>
          <Ingredients
            order={order}
            itemsData={sauceItemsData}
            onIngredientClick={onSauceIngredientClick}
          />
        </li>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">{text.thirdIngredientCategory}</h2>
          <Ingredients
            order={order}
            itemsData={fillingItemsData}
            onIngredientClick={onFillingIngredientClick}
          />
        </li>
      </ul>
      {
        ingrediebtDetailsModalIsVisible
        && (
          <Modal
            closeModal={closeIngrediebtDetailsModal}
            title={text.ingredientDetails}
            className={styles['ingredient-details']}
          >
            <IngredientDetails ingredientData={activeIngredient} />
          </Modal>
        )
      }
    </section>
  );
};

BurgerIngredients.propTypes = {
  order: orderPropTypes.isRequired,
  ingredients: ingredientListPropTypes.isRequired,
  setBun: PropTypes.func.isRequired,
  addFilling: PropTypes.func.isRequired,
};

export default BurgerIngredients;
