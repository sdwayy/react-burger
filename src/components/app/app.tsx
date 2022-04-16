import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './app.module.css';

import ModalSwitch from '../modal-switch/modal-switch';
import Header from '../app-header/app-header';

import { fetchIngredients } from '../../services/store/slices/ingredients';
import { getUser } from '../../services/store/slices/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
