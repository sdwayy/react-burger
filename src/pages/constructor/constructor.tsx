import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './constructor.module.css';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import { useAppSelector } from '../../utils/hooks';

const text = {
  errorMessage: 'В приложении произошла ошибка. Пожалуйста, перезагрузите страницу',
  errorTitle: 'Что-то пошло не так :(',
  appTitle: 'Соберите бургер',
};

export const ConstructorPage = () => {
  const { ingredients } = useAppSelector(state => state);
  const { hasError, isLoading, list } = ingredients;

  return (
    <>
      <main className={`${styles.main}`}>
        {
          !isLoading
          && (
            <h1 className="text text_type_main-large pt-10 pb-5">
              { hasError ? text.errorTitle : text.appTitle}
            </h1>
          )
        }
        {
          hasError
            ? <p className="text text_type_main-medium">{text.errorMessage}</p>
            : (
              list.length > 0
              && (
                <div className={styles['content-container']}>
                  <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </DndProvider>
                </div>
              )
            )
        }
      </main>
    </>
  );
};
