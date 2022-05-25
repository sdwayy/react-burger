import { order } from '../../../../mocks/order';
import {
  createdOrder as reducer,
  initialState,
  resetCreatedOrder,
} from './createdOrder';

describe('reducers tests', () => {
  test('Should be correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Should reset created order', () => {
    const previousState = order;
    const newState = reducer(previousState, resetCreatedOrder());
    expect(newState).toEqual({});
  });
});
