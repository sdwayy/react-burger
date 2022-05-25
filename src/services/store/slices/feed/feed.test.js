import { mockApi } from '../../../../mocks/api';

import {
  feed as reducer,
  initialState,
  setFeedData,
  onFeedConectionOpen,
  onFeedConectionClose,
  onFeedError,
} from './feed';

describe('reducers tests', () => {
  test('Should be correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Should set feed data', () => {
    const previousState = {
      data: {
        total: 0,
        totalToday: 0,
        orders: [],
      },
    };

    const { success, ...restParsedData } = mockApi.userOrders;
    const newState = reducer(previousState, setFeedData(restParsedData));

    expect(newState.data.total).toBe(restParsedData.total);
    expect(newState.data.totalToday).toBe(restParsedData.totalToday);
    expect(newState.data.orders.length).toBe(2);
  });

  test('Should set connection open state', () => {
    const previousState = {
      isConnected: false,
      hasError: true,
    };
    const newState = reducer(previousState, onFeedConectionOpen());
    expect(newState.isConnected).toBe(true);
    expect(newState.hasError).toBe(false);
  });

  test('Should set connection close state', () => {
    const previousState = {
      isConnected: true,
      hasError: true,
    };
    const newState = reducer(previousState, onFeedConectionClose());
    expect(newState.isConnected).toBe(false);
    expect(newState.hasError).toBe(false);
  });

  test('Should set connection error state', () => {
    const previousState = {
      isConnected: true,
      hasError: false,
    };
    const newState = reducer(previousState, onFeedError());
    expect(newState.isConnected).toBe(false);
    expect(newState.hasError).toBe(true);
  });
});
