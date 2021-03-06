import {
  createAsyncThunk,
  createSlice,
  AnyAction,
} from '@reduxjs/toolkit';

import routes from '../../../../routes';
import { deleteCookie, getCookie, setCookie } from '../../../utils';
import { TApiResponse, TUserData } from '../../../../utils/types';

const setAccesTokenCookie = (accessToken: string) => {
  const TIMEOUT_IN_MINUTES = 20;
  const token = accessToken.split('Bearer ')[1];
  const expires = new Date(Date.now() + TIMEOUT_IN_MINUTES * 60 * 1000).toUTCString();
  setCookie('accessToken', token, { expires });
};

const setRefreshTokenCookie = (refreshToken: string) => {
  const TIMEOUT_IN_DAYS = 30;
  const expires = new Date(Date.now() + TIMEOUT_IN_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  setCookie('refreshToken', refreshToken, { expires });
};

type TTokenResponse = TApiResponse & {
  accessToken: string;
  refreshToken: string;
};

export const updateTokens = async (): Promise<TTokenResponse> => {
  const token = getCookie('refreshToken');

  if (!token) {
    throw new Error ('refreshToken is undefined');
  }

  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  };

  const response = await fetch(routes.token, data);
  const json = await response.json();

  const { success, message } = json;

  if (!success) {
    throw new Error(message);
  }

  const { accessToken, refreshToken } = json;
  setAccesTokenCookie(accessToken);
  setRefreshTokenCookie(refreshToken);

  return json;
};

type TUserResponse = TTokenResponse & {
  user: Omit<TUserData, 'password'>,
};

export const patchUser = createAsyncThunk<TUserResponse, Partial<TUserData>>(
  'auth/patchUser',
  async (userData, { dispatch }) => {
    const refreshToken = getCookie('refreshToken');
    const accessToken = getCookie('accessToken');

    if (!refreshToken && !accessToken) throw new Error('user is not authorized');

    const data = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(routes.user, data);
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

export const getUser = createAsyncThunk<TUserResponse>(
  'auth/getUser',
  async (params, { dispatch }) => {
    const refreshToken = getCookie('refreshToken');
    const accessToken = getCookie('accessToken');

    if (!refreshToken && !accessToken) throw new Error('user is not authorized');

    const data = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    };

    const response = await fetch(routes.user, data);
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

type TRegisterResponse = TUserResponse & TTokenResponse;

export const register = createAsyncThunk<TRegisterResponse, TUserData>(
  'auth/register',
  async (userData) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(routes.register, data);
    const json = await response.json();

    return json;
  },
);

type TSignInResponse = TApiResponse & TTokenResponse & TUserResponse;

export const signIn = createAsyncThunk<TSignInResponse, Omit<TUserData, 'name'>>(
  'auth/signIn',
  async (userData) => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
    };

    const response = await fetch(routes.login, data);
    const json = await response.json();

    return json;
  },
);

export const signOut = createAsyncThunk<TApiResponse>(
  'auth/signOut',
  async () => {
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: getCookie('refreshToken') }),
    };

    const response = await fetch(routes.logout, data);
    const json = await response.json();

    return json;
  },
);

const getUserFinallyMatcher = ({ type }: AnyAction) => (
  type === getUser.fulfilled.type
  || type === getUser.rejected.type
);

type TInitialState = {
  user: null | Omit<TUserData, 'password'>,
  isUserLoaded: boolean;
  errors: {
    register: null | string,
    signIn: null | string,
    getUser: null | string,
    patchUser: null | string,
    signOut: null | string,
  },
}

export const initialState: TInitialState = {
  user: null,
  isUserLoaded: false,
  errors: {
    register: null,
    signIn: null,
    getUser: null,
    patchUser: null,
    signOut: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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

        if (!success && message) {
          state.errors.register = message;
          return;
        }

        setAccesTokenCookie(accessToken);
        setRefreshTokenCookie(refreshToken);

        state.errors.register = null;
        state.user = user;
      })
      .addCase(register.rejected, state => {
        state.errors.register = '??????-???? ?????????? ???? ??????';
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

        if (!success && message) {
          state.errors.signIn = message;
          return;
        }

        setAccesTokenCookie(accessToken);
        setRefreshTokenCookie(refreshToken);

        state.errors.signIn = null;
        state.user = user;
      })
      .addCase(signIn.rejected, state => {
        state.errors.signIn = '??????-???? ?????????? ???? ??????';
      })
      .addCase(getUser.pending, state => {
        state.errors.getUser = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        const { success, user, message } = payload;

        if (!success && message) {
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

        if (!success && message) {
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

        if (!success && message) {
          state.errors.signOut = message;
          return
        }

        deleteCookie('accessToken');
        deleteCookie('refreshToken');

        state.user = null;
      })
      .addMatcher(getUserFinallyMatcher, state => {
        state.isUserLoaded = true;
      })
  },
});

export const auth = authSlice.reducer;
