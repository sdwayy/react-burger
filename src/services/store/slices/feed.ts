import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TFeedData, TSocketState } from '../../../utils/types';
import { formatDate } from '../../utils';

type TInitialState = TSocketState<TFeedData>;

const initialState: TInitialState = {
  data: null,
  isLoading: true,
  hasError: false,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    init: () => {},
    setData: (state, { payload }: PayloadAction<TFeedData>) => {
      const formattedData = {
        ...payload,
        orders: payload.orders.map(order => {
          const { createdAt } = order;
          return { ...order, createdAt: formatDate(createdAt) };
        })
      };

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

export const feed = feedSlice.reducer;
export const {
  init: initFeed,
  setData: setFeedData,
  onConectionOpen: onFeedConectionOpen,
  onConectionClose: onFeedConectionClose,
  onConectionError: onFeedConectionError,
} = feedSlice.actions;
