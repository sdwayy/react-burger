import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  REGISTER_URL,
  LOGIN_URL,
  USER_URL,
  TOKEN_URL,
  LOGOUT_URL,
} from '../../../constants';
import { deleteCookie, getCookie, setCookie } from '../../utils';

export const updateTokens = async () => {
  const token = getCookie('refreshToken');

  if (!token) throw new Error ('refreshToken is undefined');

  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  };

  const response = await fetch(TOKEN_URL, data);
  const json = await response.json();

  const { success, message } = json;

  if (!success) {
    return Promise.reject(message);
  }

  const { accessToken, refreshToken } = json;
  setCookie('accessToken', accessToken.split('Bearer ')[1]);
  setCookie('refreshToken', refreshToken);

  return json;
};

export const patchUser = createAsyncThunk(
  'auth/patchUser',
  async (userData, { dispatch }) => {
    const token = getCookie('accessToken');

    if (!token) {
      dispatch({
        type: 'auth/setAuthorizedState',
        payload: false,
      });
      throw new Error('accessToken is undefined');
    }

    const data = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(USER_URL, data);
    const json = await response.json();

    const { success } = json;

    if (!success) {
      try {
        await updateTokens();
        dispatch(patchUser(userData));
      } catch {
        throw new Error('Update tokens failed');
      };
    }

    return json;
  },
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (params, { dispatch }) => {
    const token = getCookie('accessToken');

    if (!token) {
      dispatch({
        type: 'auth/setAuthorizedState',
        payload: false,
      });
      throw new Error('accessToken is undefined');
    }

    const data = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    const response = await fetch(USER_URL, data);
    const json = await response.json();
    const { success } = json;

    if (!success) {
      try {
        await updateTokens();
        dispatch(getUser());
      } catch {
        throw new Error('Update tokens failed');
      }
    }

    return json;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async userData => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(REGISTER_URL, data);
    const json = await response.json();

    return json;
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async userData => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(LOGIN_URL, data);
    const json = await response.json();

    return json;
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: getCookie('refreshToken') }),
    };

    const response = await fetch(LOGOUT_URL, data);
    const json = await response.json();

    return json;
  },
);

const initialState = {
  user: null,
  isAuthorized: !!getCookie('refreshToken'),
  errors: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizedState: (state, { payload }) => {
      state.isAuthorized = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.errors.register = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        const {
          success,
          user,
          accessToken,
          refreshToken,
          message,
        } = payload;

        if (!success) {
          state.errors.register = message;
          return;
        }

        setCookie('accessToken', accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', refreshToken);

        state.errors.register = null;
        state.user = user;
        state.isAuthorized = true;
      })
      .addCase(register.rejected, state => {
        state.errors.register = 'Что-то пошло не так';
      })
      .addCase(signIn.pending, state => {
        state.errors.signIn = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        const {
          success,
          user,
          accessToken,
          refreshToken,
          message,
        } = payload;

        if (!success) {
          state.errors.signIn = message;
          return;
        }

        setCookie('accessToken', accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', refreshToken);

        state.errors.signIn = null;
        state.user = user;
        state.isAuthorized = true;
      })
      .addCase(signIn.rejected, state => {
        state.errors.signIn = 'Что-то пошло не так';
      })
      .addCase(getUser.pending, state => {
        state.errors.getUser = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        const { success, user, message } = payload;

        if (!success) {
          state.errors.getUser = message;
          return
        }

        state.errors.getUser = null;
        state.user = user;
      })
      .addCase(patchUser.pending, state => {
        state.errors.patchUser = null;
      })
      .addCase(patchUser.fulfilled, (state, { payload }) => {
        const { success, user, message } = payload;

        if (!success) {
          state.errors.patchUser = message;
          return
        }

        state.errors.patchUser = null;
        state.user = user;
      })
      .addCase(signOut.pending, state => {
        state.errors.signOut = null;
      })
      .addCase(signOut.fulfilled, (state, { payload }) => {
        const { success, message } = payload;

        if (!success) {
          state.errors.signOut = message;
          return
        }

        deleteCookie('accessToken');
        deleteCookie('refreshToken');

        return { ...initialState, isAuthorized: false, };
      })
  },
});

export const auth = authSlice.reducer;
