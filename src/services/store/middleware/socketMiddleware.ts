import { AnyAction, MiddlewareAPI , Middleware} from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from '..';
import { getCookie } from '../../utils';
import { TApiResponse } from '../../../utils/types';

type TSocketActions = {
  init: ActionCreatorWithoutPayload;
  close: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
  sendMessage?: ActionCreatorWithPayload<any>;
  onOpen?: ActionCreatorWithPayload<Event> | ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithPayload<Event> | ActionCreatorWithoutPayload;
  onError?: ActionCreatorWithPayload<Event> | ActionCreatorWithoutPayload;
}

type TSocketParams = {
  url: string;
  isProtected: boolean;
};

export function socketMiddleware<T> (
  { url, isProtected }: TSocketParams,
  socketActions: TSocketActions,
): Middleware {
  return (store: MiddlewareAPI<AppDispatch, RootState> ) => {
    let socket: WebSocket | null = null;

    return next => (action: AnyAction) => {
      const { dispatch } = store;

      const { type, payload } = action;
      const token = getCookie('accessToken');

      if (
        (isProtected && !token)
        || !Object.values(socketActions).some(action => action.type === type)
      ) {
        next(action);
        return;
      }

      const {
        init,
        close,
        sendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = socketActions;

      if (type === close.type && socket) socket.close();

      if (type === init.type) {
        const socketUrl = new URL(url);

        if (isProtected && token) {
          socketUrl.searchParams.append('token', token);
        }

        if (!isProtected || (isProtected && token)) {
          socket = new WebSocket(socketUrl.href);

          if (onOpen) {
            socket.onopen = event => {
              dispatch(onOpen(event));
            };
          }

          if (onError) {
            socket.onerror = event => {
              dispatch(onError(event));
            };
          }

          if (onClose) {
            socket.onclose = event => {
              dispatch(onClose(event));
            };
          }

          socket.onmessage = event => {
            const { data } = event;
            const parsedData: T & TApiResponse = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;

            if (success) {
              dispatch(onMessage(restParsedData));
            } else {
              if (onError) dispatch(onError(event));
            }
          };
        }
      }

      if (socket && sendMessage && type === sendMessage.type) {
        const message = {
          ...payload
        };

        if (isProtected) {
          message.token = token;
        }

        socket.send(JSON.stringify(message))
      }

      next(action);
    };
  };
};