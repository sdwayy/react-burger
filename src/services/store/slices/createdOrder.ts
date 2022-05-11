import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrderResponse } from '../../../utils/types';
import { fetchOrder } from './currentOrder';

const initialState: Partial<TOrder> = {};

const orderIsCreated = (action: AnyAction) => action.type === fetchOrder.fulfilled.type;

const createdOrderSlice = createSlice({
  name: 'createdOrder',
  initialState,
  reducers: {
    resetCreatedOrder: () =>  initialState,
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        orderIsCreated,
        (state, { payload }: PayloadAction<TOrderResponse>) => payload.order
      );
  },
});

export const createdOrder = createdOrderSlice.reducer;
export const { resetCreatedOrder } = createdOrderSlice.actions;
