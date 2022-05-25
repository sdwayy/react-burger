import { combineReducers } from 'redux';

import { createdOrder } from './createdOrder/createdOrder';
import { currentOrder } from './currentOrder/currentOrder';
import { ingredients } from './ingredients/ingredients';
import { auth } from './auth/auth';
import { userOrders } from './userOrders/userOrders';
import { feed } from './feed/feed';

export const rootReducer = combineReducers({
  createdOrder,
  currentOrder,
  ingredients,
  auth,
  userOrders,
  feed,
});
