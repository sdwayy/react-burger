import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import './app.module.css';

import ModalSwitch from '../modal-switch/modal-switch';
import Header from '../app-header/app-header';

import { fetchIngredients } from '../../services/store/slices/ingredients';
import { getUser } from '../../services/store/slices/auth';
import { initFeed } from '../../services/store/slices/feed';
import { initUserOrders } from '../../services/store/slices/userOrders';
import { getCookie } from '../../services/utils';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale('ru');

    dispatch(fetchIngredients());
    dispatch(getUser());
    dispatch(initFeed());

    if (getCookie('accessToken')) dispatch(initUserOrders());
  }, []);

  return (
    <Router>
      <Header />
      <ModalSwitch />
    </Router>
  );
};

export default App;
