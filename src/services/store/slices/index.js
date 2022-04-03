import { combineReducers } from 'redux';

import { createdOrder } from './createdOrder';
import { currentOrder } from './currentOrder';
import { ingredients } from './ingredients';
import { auth } from './auth';

export const rootReducer = combineReducers({
  createdOrder,
  currentOrder,
  ingredients,
  auth,
});
