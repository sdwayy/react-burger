import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { useAppSelector } from '../../utils/hooks';
import styles from './burger-ingredients.module.css';

import {
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredients from './ingredients';
import { TIngredient } from '../../utils/types';

const categories = ['bun', 'sauce', 'main'] as const;
const text = {
  ingredientCategories: {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  },
  ingredientDetails: 'Детали ингредиента',
};

const BurgerIngredients = () => {
  const { list: ingredients } = useAppSelector(state => state.ingredients);

  const itemsDataByCategory = useMemo(
    () => ingredients.reduce((acc: { [key: string]: TIngredient[] }, item: TIngredient) => {
      const { type } = item;

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(item);

      return acc;
    }, {}),
    [ingredients],
  );

  const prevTab = useRef<null | string>(null);
  const [currentTab, setCurrurentTab] = useState(prevTab.current || categories[0]);
  const ingredientListContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ingredientListContainerElement = ingredientListContainerRef.current;

    const observerOptions = {
      root: ingredientListContainerElement,
      rootMargin: '-5% 0px -90% 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting, target }) => {
        if (target instanceof HTMLElement) {
          const targetCategory = target?.dataset.ingredientCategory;

          if (isIntersecting && targetCategory && targetCategory !== prevTab.current) {
            prevTab.current = targetCategory;
            setCurrurentTab(targetCategory);
          }
        }
      })
    }, observerOptions);

      if (ingredientListContainerElement) {
        [...Array.from(ingredientListContainerElement.children)].forEach(child => {
          observer.observe(child);
        });
      }
  }, []);


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
          />
        </li>
      )
    }),
    [itemsDataByCategory],
  );

  const tabs = useMemo(
    () => categories.map((category , index) => (
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
    </section>
  );
};

export default BurgerIngredients;
