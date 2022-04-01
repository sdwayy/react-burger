import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { INGREDIENTS_URL } from '../../../constants';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(INGREDIENTS_URL, data);
    const json = await response.json();

    return json;
  }
);

const finallyMetcher = ({ type }) => (
  type === fetchIngredients.fulfilled.type
  || type === fetchIngredients.rejected.type
);

const initialState = {
  list: [],
  isLoading: false,
  hasError: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        const { data, success } = payload;

        if (success) {
          state.list = data;
        } else {
          state.hasError = true;
        }
      })
      .addCase(fetchIngredients.rejected, state => {
        state.hasError = true;
      })
      .addMatcher(finallyMetcher, state => {
        state.isLoading = false;
      })
  },
});

export const ingredients = ingredientsSlice.reducer;
