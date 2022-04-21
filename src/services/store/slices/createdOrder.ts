import { createSlice, AnyAction } from '@reduxjs/toolkit';
import { fetchOrder } from './currentOrder';

type TInitialState = {
  number: null | number;
};

const initialState: TInitialState = {
  number: null,
};

const orderIsCreated = (action: AnyAction) => action.type === fetchOrder.fulfilled.type;

const createdOrderSlice = createSlice({
  name: 'createdOrder',
  initialState,
  reducers: {
    resetCreatedOrder: () =>  initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(orderIsCreated, (state, { payload }) => payload.order);
  },
});

export const createdOrder = createdOrderSlice.reducer;
export const { resetCreatedOrder } = createdOrderSlice.actions;
