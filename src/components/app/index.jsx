import React, { useEffect } from 'react';
import styles from './app.module.css'

import Header from '../header';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';

import mockData from '../../utils/data' 

const App = () => {
  const [data, setData] = React.useState([]);
  const [burger, setBurger] = React.useState({ bun: {}, filling: [], });

  const { filling } = burger;

  const setBun = newBun => setBurger({ ...burger, bun: newBun });

  const addFilling = addedFilling => setBurger({
    ...burger,
    filling: [...filling, addedFilling],
  });

  const removeFilling = index => {
    setBurger({
      ...burger,
      filling: [...filling.slice(0, index), ...filling.slice(index + 1)],
    });

    return true;
  };

  React.useEffect(() => {
    setData(mockData)
  }, []);

  return (
    <>
      <Header />
      <main className={`${styles.main}`}>
        <h1 className="text text_type_main-large pt-10 pb-5">
          Соберите бургер
        </h1>
        <div className={styles['content-container']}>
          <BurgerIngredients burger={burger} ingredients={data} addFilling={addFilling} setBun={setBun} />
          <BurgerConstructor burger={burger} removeFilling={removeFilling} />
        </div>
      </main>
    </>
  );
}

export default App;
