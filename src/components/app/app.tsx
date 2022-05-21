import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import './app.module.css';

import ModalSwitch from '../modal-switch/modal-switch';
import Header from '../app-header/app-header';

import { fetchIngredients } from '../../services/store/slices/ingredients';
import { getUser } from '../../services/store/slices/auth';
import { useAppDispatch } from '../../utils/hooks';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    moment.locale('ru');

    dispatch(fetchIngredients());
    dispatch(getUser());
  }, []);

  return (
    <Router>
      <Header />
      <ModalSwitch />
    </Router>
  );
};

export default App;
