import { combineReducers } from 'redux';

import { activeIngredient } from './activeIngredient';
import { createdOrder } from './createdOrder';
import { currentOrder } from './currentOrder';
import { ingredients } from './ingredients';

export const rootReducer = combineReducers({
  activeIngredient,
  createdOrder,
  currentOrder,
  ingredients,
});
