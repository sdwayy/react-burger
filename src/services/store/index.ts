import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';
import { socketMiddleware } from './middleware/socketMiddleware';
import routes from '../../routes';

import {
  initFeed,
  setFeedData,
  onFeedConectionClose,
  onFeedConectionOpen,
  onFeedError,
  closeFeedConnection,
} from './slices/feed/feed';
import {
  initUserOrders,
  onUserOrdersConectionClose,
  onUserOrdersError,
  onUserOrdersConectionOpen,
  setUserOrdersData,
  closeUserOrdersConnection,
} from './slices/userOrders/userOrders';

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
        close: closeFeedConnection,
        onMessage: setFeedData,
        onError: onFeedError,
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
        close: closeUserOrdersConnection,
        onMessage: setUserOrdersData,
        onError: onUserOrdersError,
        onOpen: onUserOrdersConectionOpen,
        onClose: onUserOrdersConectionClose,
      },
    ))
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
