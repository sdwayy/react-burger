import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';
import { socketMiddleware } from './middleware/socketMiddleware';
import routes from '../../routes';

import {
  initFeed,
  setFeedData,
  onFeedConectionClose,
  onFeedConectionOpen,
  onFeedConectionError,
} from './slices/feed';
import {
  initUserOrders,
  onUserOrdersConectionClose,
  onUserOrdersConectionError,
  onUserOrdersConectionOpen,
  setUserOrdersData
} from './slices/userOrders';

import { TFeedData } from '../../utils/types';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat(socketMiddleware<TFeedData>(
      {
        url: routes.feed,
        isProtected: false,
      },
      {
        init: initFeed,
        onMessage: setFeedData,
        onError: onFeedConectionError,
        onOpen: onFeedConectionOpen,
        onClose: onFeedConectionClose,
      },
    ))
    .concat(socketMiddleware<TFeedData>(
      {
        url: routes.userOrders,
        isProtected: true,
      },
      {
        init: initUserOrders,
        onMessage: setUserOrdersData,
        onError: onUserOrdersConectionError,
        onOpen: onUserOrdersConectionOpen,
        onClose: onUserOrdersConectionClose,
      },
    ))
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
