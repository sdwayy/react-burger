import { configureStore } from '@reduxjs/toolkit';

import { ingredients } from '../../../../mocks/ingredients';
import { mockApi } from '../../../../mocks/api';

import routes from '../../../../routes';
import {
  ingredients as reducer,
  initialState,
  fetchIngredients,
} from './ingredients';

describe('reducers tests', () => {
  test('Should be correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

describe('fetch order tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.ingredients),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const store = configureStore({ reducer });
  const action = fetchIngredients();

  test('Should fetch error', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.error),
    }));

    let state = store.getState();

    const { payload } = await action(store.dispatch, store.getState, undefined);

    expect(payload).toEqual(mockApi.error);
    state = store.getState();
    expect(state.hasError).toBe(true);
  });

  test('Should fetch ingredients', async () => {
    let state = store.getState();

    const { payload } = await action(store.dispatch, store.getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(routes.ingredients, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(payload).toEqual(mockApi.ingredients);
    state = store.getState();
    expect(state.list).toEqual(ingredients);
  });
});
