import React from 'react';
import styles from './app.module.css'

import Header from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const text = {
  errorMessage: 'В приложении произошла ошибка. Пожалуйста, перезагрузите страницу',
  errorTitle: 'Что-то пошло не так :(',
  appTitle: 'Соберите бургер',
};

const defaultOrderValue = {
  bun: {},
  filling: [],
};

const App = () => {
  const [data, setData] = React.useState([]);
  const [order, setOrder] = React.useState(defaultOrderValue);

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { filling } = order;

  const createNewOrder = () => {
    setOrder({ ...defaultOrderValue })
  };

  const setBun = newBun => setOrder({ ...order, bun: newBun });

  const addFilling = addedFilling => setOrder({
    ...order,
    filling: [...filling, addedFilling],
  });

  const removeFilling = index => {
    setOrder({
      ...order,
      filling: [...filling.slice(0, index), ...filling.slice(index + 1)],
    });

    return true;
  };

  React.useEffect(() => {
    fetch(URL)
      .then(response => {
        return response.json();
      })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <Header />
      <main className={`${styles.main}`}>
        <>
          <h1 className="text text_type_main-large pt-10 pb-5">
            { error ? text.errorTitle : text.appTitle}
          </h1>
          {
            error
              ? (
                <p className="text text_type_main-medium">{text.errorMessage}</p>
              )
              : (
                !loading
                && (
                  <div className={styles['content-container']}>
                    <BurgerIngredients
                      order={order}
                      ingredients={data}
                      addFilling={addFilling}
                      setBun={setBun}
                    />
                    <BurgerConstructor
                      order={order}
                      removeFilling={removeFilling}
                      createNewOrder={createNewOrder}
                    />
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
