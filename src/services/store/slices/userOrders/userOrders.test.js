import { mockApi } from '../../../../mocks/api';

import {
  userOrders as reducer,
  initialState,
  setUserOrdersData,
  onUserOrdersConectionOpen,
  onUserOrdersConectionClose,
  onUserOrdersError,
} from './userOrders';

describe('reducers tests', () => {
  test('Should be correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Should set user orders data', () => {
    const previousState = {
      data: [],
    };

    const { success, ...restParsedData } = mockApi.userOrders;
    const newState = reducer(previousState, setUserOrdersData(restParsedData));

    expect(newState.data.length).toBe(2);
  });

  test('Should set connection open state', () => {
    const previousState = {
      isConnected: false,
      hasError: true,
    };
    const newState = reducer(previousState, onUserOrdersConectionOpen());
    expect(newState.isConnected).toBe(true);
    expect(newState.hasError).toBe(false);
  });

  test('Should set connection close state', () => {
    const previousState = {
      isConnected: true,
      hasError: true,
    };
    const newState = reducer(previousState, onUserOrdersConectionClose());
    expect(newState.isConnected).toBe(false);
    expect(newState.hasError).toBe(false);
  });

  test('Should set connection error state', () => {
    const previousState = {
      isConnected: true,
      hasError: false,
    };
    const newState = reducer(previousState, onUserOrdersError());
    expect(newState.isConnected).toBe(false);
    expect(newState.hasError).toBe(true);
  });
});
