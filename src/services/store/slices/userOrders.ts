import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TFeedData, TFeedOrder, TSocketState } from '../../../utils/types';
import { formatDate } from '../../utils';

type TInitialState = TSocketState<TFeedOrder[]>;

const initialState: TInitialState = {
  data: [],
  isConnected: true,
  hasError: false,
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    init: () => {},
    closeUserOrdersConnection: () => {},
    setData: (state, { payload }: PayloadAction<TFeedData>) => {
      const formattedData = payload.orders.map(order => {
        const { createdAt } = order;
        return { ...order, createdAt: formatDate(createdAt) };
      })

      state.data = formattedData;
    },
    onConectionOpen: state => {
      state.isConnected = true;
      state.hasError = false;
    },
    onConectionClose: state => {
      state.hasError = false;
      state.isConnected = false;
    },
    onError: state => {
      state.hasError = true;
      state.isConnected = false;
    },
  },
});

export const userOrders = userOrdersSlice.reducer;
export const {
  init: initUserOrders,
  setData: setUserOrdersData,
  onConectionOpen: onUserOrdersConectionOpen,
  onConectionClose: onUserOrdersConectionClose,
  onError: onUserOrdersError,
  closeUserOrdersConnection,
} = userOrdersSlice.actions;
