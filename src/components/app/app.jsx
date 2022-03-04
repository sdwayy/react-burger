import React, {
  useState,
  useEffect,
  useReducer,
} from 'react';
import styles from './app.module.css'

import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { orderContext } from '../../services/orderContext';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

const text = {
  errorMessage: 'В приложении произошла ошибка. Пожалуйста, перезагрузите страницу',
  errorTitle: 'Что-то пошло не так :(',
  appTitle: 'Соберите бургер',
};

const initialOrderState = {
  bun: null,
  filling: [],
  price: 0,
};

const getOrderPrice = (currentBun, currentFilling) => {
  const bunPrice = currentBun ? currentBun.price * 2 : 0;
  const fillingPrice = currentFilling.reduce((acc, i) =>  acc + i.price, 0);

  return bunPrice + fillingPrice;
};

const orderReducer = (state, { type, payload }) => {
  const {
    filling,
    bun,
  } = state;

  switch (type) {
    case 'addFilling': {
      const newFilling = [...filling, payload.filling];

      return {
        ...state,
        filling: newFilling,
        price: getOrderPrice(bun, newFilling),
      };
    }
    case 'removeFilling': {
      const newFilling = [
        ...filling.slice(0, payload.index),
        ...filling.slice(payload.index + 1),
      ];

      return {
        ...state,
        filling: newFilling,
        price: getOrderPrice(bun, newFilling),
      };
    }
    case 'setBun': {
      return {
        ...state,
        bun: payload.bun,
        price: getOrderPrice(payload.bun, filling),
      };
    }
    case 'resetOrder':
      return initialOrderState;
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

const App = () => {
  const [orderState, orderDispatcher] = useReducer(orderReducer, initialOrderState);
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(INGREDIENTS_URL)
      .then(response => {
        return response.json();
      })
      .then(response => {
        setData(response.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <orderContext.Provider value={{ orderState, orderDispatcher }}>
        <main className={`${styles.main}`}>
          <>
            <h1 className="text text_type_main-large pt-10 pb-5">
              { error ? text.errorTitle : text.appTitle}
            </h1>
            {
              error
                ? <p className="text text_type_main-medium">{text.errorMessage}</p>
                : (
                  !loading
                  && (
                    <div className={styles['content-container']}>
                      <BurgerIngredients ingredients={data} />
                      <BurgerConstructor />
                    </div>
                  )
                )
            }
          </>
        </main>
      </orderContext.Provider>
    </>
  );
}

export default App;
