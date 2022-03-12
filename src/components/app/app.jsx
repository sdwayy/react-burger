import React, {
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './app.module.css';

import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { fetchIngredients } from '../../services/store/slices/ingredients';

const text = {
  errorMessage: 'В приложении произошла ошибка. Пожалуйста, перезагрузите страницу',
  errorTitle: 'Что-то пошло не так :(',
  appTitle: 'Соберите бургер',
};

const App = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state);
  const { hasError, isLoading, list } = ingredients;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <Header />
        <main className={`${styles.main}`}>
          <>
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
          </>
        </main>
    </>
  );
}

export default App;
