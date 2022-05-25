import { configureStore } from '@reduxjs/toolkit';

import { ingredients } from '../../../../mocks/ingredients';
import { tokens } from '../../../../mocks/tokens';
import { mockApi } from '../../../../mocks/api';
import * as utils from '../../../utils';

import {
  currentOrder as reducer,
  initialState,
  addFilling,
  removeFilling,
  setBun,
  toggleError,
  moveFilling,
  fetchOrder,
} from './currentOrder';
import routes from '../../../../routes';

const bun = ingredients.find(({ type }) => type === 'bun');
const sauce = ingredients.find(({ type }) => type === 'sauce');
const main = ingredients.find(({ type }) => type === 'main');

describe('reducers tests', () => {
  test('Should be correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('Should add filling', () => {
    const previousState = {
      filling: []
    };
    const newState = reducer(previousState, addFilling(main));
    const { key, ...defaultIngredientProps } = newState.filling[0];
    expect(defaultIngredientProps).toEqual(main);
  });

  test('Should remove filling', () => {
    const previousState = {
      filling: [main]
    };
    const newState = reducer(previousState, removeFilling(main));
    expect(newState.filling.length).toBe(0);
  });

  test('Should set bun', () => {
    const previousState = {
      bun: {},
    };
    const newState = reducer(previousState, setBun(bun));
    const { key, ...defaultIngredientProps } = newState.bun;
    expect(defaultIngredientProps).toEqual(bun);
  });

  test('Should toggle error to true', () => {
    const previousState = {
      hasError: false,
    };
    const newState = reducer(previousState, toggleError());
    expect(newState.hasError).toBe(true);
  });

  test('Should toggle error to false', () => {
    const previousState = {
      hasError: true,
    };
    const newState = reducer(previousState, toggleError());
    expect(newState.hasError).toBe(false);;
  });

  test('Should move filling', () => {
    const previousState = {
      filling: [main, sauce]
    };
    const newState = reducer(previousState, moveFilling({ currentIndex: 1, newIndex: 0 }));
    expect(newState.filling).toEqual([sauce, main]);
  });
});

describe('fetch order tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.orders),
    });

    jest.spyOn(utils, 'getCookie').mockImplementation((tokenType) => {
      if (tokenType === 'accessToken') return tokens.access;
      if (tokenType === 'refreshToken') return tokens.refresh;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const store = configureStore({ reducer });

  store.dispatch(setBun(bun));
  store.dispatch(addFilling(main));

  test('Should fetch error', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.error),
    }));

    let state = store.getState()

    const currentOrder = {
      bun: state.bun,
      filling: state.filling,
    };

    const action = fetchOrder(currentOrder);
    const { payload } = await action(store.dispatch, store.getState, undefined);

    expect(payload).toEqual(mockApi.error);
    state = store.getState()
    expect(state.hasError).toBe(true);
  });

  test('Should fetch order', async () => {
    let currentOrderState = store.getState()

    const currentOrder = {
      bun: currentOrderState.bun,
      filling: currentOrderState.filling,
    };

    const ingredientIds = [...currentOrder.filling, currentOrder.bun, currentOrder.bun].map(({ _id }) => _id);
    const action = fetchOrder(currentOrder);
  
    const { payload } = await action(store.dispatch, store.getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(routes.orders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      },
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    });
    expect(payload).toEqual(mockApi.orders);
    currentOrderState = store.getState()
    expect(currentOrderState).toEqual(initialState);
  });
});
