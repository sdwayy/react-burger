import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const activeIngredientSlice = createSlice({
  name: 'activeIngredient',
  initialState,
  reducers: {
    setActiveIngredient: (state, { payload }) => payload,
  },
});

export const activeIngredient = activeIngredientSlice.reducer;
export const { setActiveIngredient } = activeIngredientSlice.actions;
