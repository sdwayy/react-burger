import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TFeedData, TFeedOrder, TSocketState } from '../../../utils/types';
import { formatDate } from '../../utils';

type TInitialState = TSocketState<TFeedOrder[]>;

const initialState: TInitialState = {
  data: null,
  isLoading: true,
  hasError: false,
  isInited: false,
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    init: state => {
      state.isInited = true;
    },
    setData: (state, { payload }: PayloadAction<TFeedData>) => {
      const formattedData = payload.orders.map(order => {
        const { createdAt } = order;
        return { ...order, createdAt: formatDate(createdAt) };
      })

      state.data = formattedData;
    },
    onConectionOpen: state => {
      state.isLoading = false;
      state.hasError = false;
    },
    onConectionClose: state => {
      state.hasError = false;
    },
    onConectionError: state => {
      state.hasError = true;
      state.isLoading = false;
    },
  },
});

export const userOrders = userOrdersSlice.reducer;
export const {
  init: initUserOrders,
  setData: setUserOrdersData,
  onConectionOpen: onUserOrdersConectionOpen,
  onConectionClose: onUserOrdersConectionClose,
  onConectionError: onUserOrdersConectionError,
} = userOrdersSlice.actions;
