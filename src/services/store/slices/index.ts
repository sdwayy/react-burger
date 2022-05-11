import { combineReducers } from 'redux';

import { createdOrder } from './createdOrder';
import { currentOrder } from './currentOrder';
import { ingredients } from './ingredients';
import { auth } from './auth';
import { userOrders } from './userOrders';
import { feed } from './feed';

export const rootReducer = combineReducers({
  createdOrder,
  currentOrder,
  ingredients,
  auth,
  userOrders,
  feed,
});
