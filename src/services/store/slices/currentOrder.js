import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import routes from '../../../routes';
import { getCookie } from '../../utils';

const generateFillingItemKey = ({ _id }) => `${_id}-${+new Date()}`;

export const fetchOrder = createAsyncThunk(
  'currentOrder/fetchOrder',
  async ({ filling, bun }) => {
    const ingredientIds = [
      bun._id,
      ...filling.map(({ _id }) => _id),
    ];

    const body = JSON.stringify({
      ingredients: ingredientIds,
    });

    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('accessToken')}`
      },
      body,
    };

    const response = await fetch(routes.orders, data);
    const json = await response.json();

    return json;
  }
);

const finallyMatcher = ({ type }) => (
  type === fetchOrder.fulfilled.type
  || type === fetchOrder.rejected.type
);

const initialState = {
  bun: null,
  filling: [],
  isLoading: false,
  hasError: false,
};

const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    addFilling: (state, { payload }) => {
      const key = generateFillingItemKey(payload);

      state.filling.push({ ...payload, key });
    },
    removeFilling: (state, { payload }) => {
      const { filling } = state;
      const { key } = payload;

      state.filling = filling.filter(item => item.key !== key);
    },
    moveFilling: ({ filling }, { payload }) => {
      const { currentIndex, newIndex } = payload;

      filling.splice(newIndex, 0, filling.splice(currentIndex, 1)[0]);
    },
    setBun: (state, { payload }) => {
      state.bun = payload;
    },
    toggleError: state => {
      state.hasError = !state.hasError;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, { payload }) => {
        const { success } = payload;

        if (!success) {
          state.hasError = true;
          return;
        }

        return initialState;
      })
      .addCase(fetchOrder.rejected, state => {
        state.hasError = true;
      })
      .addMatcher(finallyMatcher, state => {
        state.isLoading = false;
      })
  },
});

export const currentOrder = currentOrderSlice.reducer;
export const {
  addFilling,
  removeFilling,
  moveFilling,
  setBun,
  toggleError,
} = currentOrderSlice.actions;
