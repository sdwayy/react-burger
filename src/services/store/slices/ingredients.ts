import {
  createSlice,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

import routes from '../../../routes';
import { TApiResponse, TIngredient } from '../../../utils/types';

type TIngredientsResponse = TApiResponse & { data: TIngredient[] };

export const fetchIngredients = createAsyncThunk<TIngredientsResponse>(
  'ingredients/fetchIngredients',
  async () => {
    const data = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(routes.ingredients, data);
    const json = await response.json();

    return json;
  }
);

const finallyMatcher = ({ type }: AnyAction) => (
  type === fetchIngredients.fulfilled.type
  || type === fetchIngredients.rejected.type
);

type TInitialState = {
  list: readonly TIngredient[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TInitialState = {
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
      .addMatcher(finallyMatcher, state => {
        state.isLoading = false;
      })
  },
});

export const ingredients = ingredientsSlice.reducer;
