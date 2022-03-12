import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import styles from './burger-ingredients.module.css';

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from './ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { setActiveIngredient } from '../../services/store/slices/activeIngredient';

const categories = ['bun', 'sauce', 'main'];
const text = {
  ingredientCategories: {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  },
  ingredientDetails: 'Детали ингредиента',
};

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { list: ingredients } = useSelector(state => state.ingredients);

  const itemsDataByCategory = useMemo(
    () => ingredients.reduce((acc, item) => {
      const { type } = item;

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(item);

      return acc;
    }, {}),
    [ingredients],
  );

  const prevTab = useRef(null);
  const [currentTab, setCurrurentTab] = useState(prevTab.current || categories[0]);
  const [ingrediebtDetailsModalIsVisible, setIngrediebtDetailsModalVisibility] = useState(null);
  const ingredientListContainerRef = useRef(null);

  useEffect(() => {
    const ingredientListContainerElement = ingredientListContainerRef.current;

    const observerOptions = {
      root: ingredientListContainerElement,
      rootMargin: '0px',
      threshold: [0.3, 0.5, 1],
    };

    const observer = new IntersectionObserver(entries => {
      let targetEntrie = entries[0];

      if (entries.length > 0) {
        const sortedEntries = [...entries].sort((a, b) => a.intersectionRatio + b.intersectionRatio);
        targetEntrie = sortedEntries[0];
      } 

      const {
        intersectionRatio,
        intersectionRect,
        rootBounds,
        target,
      } = targetEntrie;

      const targetCategory = target?.dataset.ingredientCategory;

      if (!targetCategory || targetCategory === prevTab) return;

      const { height: rootHeight } = rootBounds;
      const { height: intersectionRectHeight } = intersectionRect;

      if (intersectionRectHeight > rootHeight * 0.7 || intersectionRatio === 1) {
        prevTab.current = targetCategory;
        setCurrurentTab(targetCategory);
      }
    }, observerOptions);

    [...ingredientListContainerElement.children].forEach(child => {
      observer.observe(child);
    });
  }, []);

  const openIngredientDetailsModal = useCallback(() => {
    setIngrediebtDetailsModalVisibility(true);
  },[]);

  const closeIngredientDetailsModal = useCallback(() => {
    setIngrediebtDetailsModalVisibility(false);
    dispatch(setActiveIngredient(null));
  },[dispatch]);

  const onIngredientClick = useCallback(ingredientData => {
    dispatch(setActiveIngredient(ingredientData));
    openIngredientDetailsModal();
  },[dispatch, openIngredientDetailsModal]);

  const ingredientsListItems = useMemo(
    () => categories.map((category, index) => {
      const items = itemsDataByCategory[category];

      return (
        <li
          className="mb-10"
          key={index}
          data-ingredient-category={category}
        >
          <h2 className="text text_type_main-medium mb-6">
            {text.ingredientCategories[category]}
          </h2>
          <Ingredients
            itemsData={items}
            onIngredientClick={onIngredientClick}
          />
        </li>
      )
    }),
    [itemsDataByCategory],
  );

  const tabs = useMemo(
    () => categories.map((category, index) => (
      <Tab
        value={category}
        active={currentTab === category}
        onClick={setCurrurentTab}
        key={`${+new Date()}-${index}}`}
      >
        {text.ingredientCategories[category]}
      </Tab>
    )),
    [currentTab],
  );

  return (
    <section className={styles.container}>
      <div className={`${styles.tabs} mb-10`}>
        {tabs}
      </div>
      <ul
        className={`${styles.list} ${styles['ingredients-list']}`}
        ref={ingredientListContainerRef}
      >
        {ingredientsListItems}
      </ul>
      {
        ingrediebtDetailsModalIsVisible
        && (
          <Modal
            closeModal={closeIngredientDetailsModal}
            title={text.ingredientDetails}
            className={styles['ingredient-details']}
          >
            <IngredientDetails />
          </Modal>
        )
      }
    </section>
  );
};

export default BurgerIngredients;
