import { createSlice } from '@reduxjs/toolkit';
import { fetchOrder } from './currentOrder';

const initialState = null;
const orderIsCreated = action => action.type === fetchOrder.fulfilled.type;

const createdOrderSlice = createSlice({
  name: 'createdOrder',
  initialState,
  reducers: {
    setCreatedOrder: (state, { payload }) =>  payload,
  },
  extraReducers: builder => {
    builder
      .addMatcher(orderIsCreated, (state, { payload }) => payload.order);
  },
});

export const createdOrder = createdOrderSlice.reducer;
export const { setCreatedOrder } = createdOrderSlice.actions;
