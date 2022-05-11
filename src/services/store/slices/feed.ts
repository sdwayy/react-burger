import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TFeedData, TSocketState } from '../../../utils/types';
import { formatDate } from '../../utils';

type TInitialState = TSocketState<TFeedData>;

const initialState: TInitialState = {
  data: {
    total: 0,
    totalToday: 0,
    orders: [],
  },
  hasError: false,
  isConnected: false,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    init: () => {},
    closeFeedConnection: () => {},
    setData: (state, { payload }: PayloadAction<TFeedData>) => {
      const formattedData = {
        ...payload,
        orders: payload.orders.map(order => {
          const { createdAt } = order;
          return {
            ...order,
            ingredients: order.ingredients.filter(i => i),
            createdAt: formatDate(createdAt),
          };
        })
      };

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

export const feed = feedSlice.reducer;
export const {
  init: initFeed,
  setData: setFeedData,
  onConectionOpen: onFeedConectionOpen,
  onConectionClose: onFeedConectionClose,
  onError: onFeedError,
  closeFeedConnection,
} = feedSlice.actions;
