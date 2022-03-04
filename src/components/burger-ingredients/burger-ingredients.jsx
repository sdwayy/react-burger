import React, {
  useState,
  useMemo,
  useContext,
} from 'react';
import styles from './burger-ingredients.module.css';

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredients from './ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { OrderContext } from '../../services/order-context';

import { ingredientListPropTypes } from '../../utils/prop-types';

const text = {
  firstIngredientCategory: 'Булки',
  secondIngredientCategory: 'Соусы',
  thirdIngredientCategory: 'Начинки',
  ingredientDetails: 'Детали ингредиента',
};

const BurgerIngredients = ({ ingredients }) => {
  const { orderDispatcher } = useContext(OrderContext);

  const [currentTab, setCurrurentTab] = useState('buns')
  const [ingrediebtDetailsModalIsVisible, setIngrediebtDetailsModalVisibility] = useState(null);
  const [activeIngredient, setActiveIngredient] = useState(null);

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
    orderDispatcher({
      type: 'setBun',
      payload: {  bun: bunData },
    });
    onIngredientClick(bunData);
  };

  const onSauceIngredientClick = sauceData => {
    orderDispatcher({
      type: 'addFilling',
      payload: {  filling: sauceData },
    });
    onIngredientClick(sauceData);
  };

  const onFillingIngredientClick = fillingData => {
    orderDispatcher({
      type: 'addFilling',
      payload: {  filling: fillingData },
    });
    onIngredientClick(fillingData);
  };

  const getIngredientItemsDataByType = requiredType => ingredients.filter(
    ({ type }) => type === requiredType,
  );

  const bunItemsData = useMemo(() => getIngredientItemsDataByType('bun'), [ingredients]);
  const sauceItemsData =  useMemo(() => getIngredientItemsDataByType('sauce'), [ingredients]);
  const fillingItemsData = useMemo(() => getIngredientItemsDataByType('main'), [ingredients]);

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
            itemsData={bunItemsData}
            onIngredientClick={onBunIngredientClick}
          />
        </li>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">{text.secondIngredientCategory}</h2>
          <Ingredients
            itemsData={sauceItemsData}
            onIngredientClick={onSauceIngredientClick}
          />
        </li>
        <li className="mb-10">
          <h2 className="text text_type_main-medium mb-6">{text.thirdIngredientCategory}</h2>
          <Ingredients
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
  ingredients: ingredientListPropTypes.isRequired,
};

export default BurgerIngredients;
