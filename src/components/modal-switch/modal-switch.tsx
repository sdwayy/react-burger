import React  from "react";
import {
  useLocation,
  useHistory,
  Switch,
  Route,
} from 'react-router-dom';
import { Location } from 'history';

import ProtectedRoute from '../protected-route/protected-route';
import {
  ConstructorPage,
  IngredientPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFound404,
  LogoutPage,
  FeedPage,
  OrderPage,
} from '../../pages';

import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

type TModalSwitchLocationState = {
  background: Location;
};

const ModalSwitch = () => {
  const location = useLocation<TModalSwitchLocationState>();
  const { goBack } = useHistory();
  const { state } = location;
  const background = state?.background;

  const handleModalClose = () => {
    goBack();
  };

  return (
    <>
      <Switch location={background || location}>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute path="/logout">
          <LogoutPage />
        </ProtectedRoute>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
        <Route path="/feed/:id">
          <OrderPage />
        </Route>
        <Route path="/feed">
          <FeedPage />
        </Route>
        <Route path="/" exact>
          <ConstructorPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {
        background?.pathname === '/'
        && (
          <Route
            path='/ingredients/:id'
            children={
              <Modal closeModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        )
      }

      {
        (background?.pathname === '/feed' || background?.pathname === '/profile/orders')
        && (
          <Route
            path={`${background.pathname}/:id`}
            children={
              <Modal closeModal={handleModalClose}>
                <OrderDetails />
              </Modal>
            }
          />
        )
      }
    </>
  );
};

export default ModalSwitch;
