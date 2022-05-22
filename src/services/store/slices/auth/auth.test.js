import { configureStore } from '@reduxjs/toolkit';

import { tokens } from '../../../../mocks/tokens';
import { mockApi } from '../../../../mocks/api';
import { user } from '../../../../mocks/user';
import routes from '../../../../routes';
import * as utils from '../../../utils';
import {
  auth as reducer,
  initialState,
  patchUser,
  getUser,
  register,
  signIn,
  signOut,
} from './auth';

describe('reducers tests', () => {
  test('Should be correct initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});

describe('auth tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(),
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
  let state;
  
  test('Should signIn', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.login),
    });

    const data = {
      email: user.email,
      password: user.password,
    };

    const action = signIn(data);

    await action(store.dispatch, store.getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(routes.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    state = store.getState();
    expect(state.user).toEqual(user);
    expect(state.errors.signIn).toBeNull();
  });

  test('Should patch user', async () => {
    const patchedData = {
      user: {
        name: user.name.slice(0, -1),
      },
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ ...mockApi.user, ...patchedData }),
    });

    const action = patchUser(patchedData.user);

    await action(store.dispatch, store.getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(routes.user, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`
      },
      body: JSON.stringify(patchedData.user),
    });

    state = store.getState();
    expect(state.user.name).toEqual(patchedData.user.name);
    expect(state.errors.patchUser).toBeNull();
  });

  test('Should signOut', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.logout),
    });

    const action = signOut();

    await action(store.dispatch, store.getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(routes.logout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: tokens.refresh }),
    });
  
    state = store.getState();
    expect(state.user).toBeNull();
    expect(state.errors.signOut).toBeNull();
  });

  test('Should register', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.login),
    });

    const action = register(user);

    await action(store.dispatch, store.getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(routes.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    state = store.getState();
    expect(state.user).toEqual(user);
    expect(state.errors.register).toBeNull();
  });

  test('Should get user', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockApi.user),
    });

    const action = getUser();

    await action(store.dispatch, store.getState, undefined);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(routes.user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      },
    });

    state = store.getState();
    expect(state.user).toEqual(user);
    expect(state.errors.getUser).toBeNull();
  });
});
