import { order } from "./order";
import { ingredients } from "./ingredients";
import { tokens } from "./tokens";
import { user } from "./user";

export const mockApi = {
  ingredients: {
    success: true,
    data: ingredients,
  },
  userOrders: {
    success: true,
    orders: [
      {
        createdAt: "2022-03-29T16:10:31.512Z",
        ingredients: ["60d3b41abdacab0026a733c7"],
        name: "Флюоресцентный бургер",
        number: 12424,
        status: "done",
        updatedAt: "2022-03-29T16:10:31.679Z",
        _id: "62432f7725b9a4001b6eb1f5",
      },
      {
        createdAt: "2022-03-29T16:12:04.584Z",
        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd'],
        name: "Флюоресцентный space бургер",
        number: 12425,
        status: "done",
        updatedAt: "2022-03-29T16:12:04.819Z",
        _id: "62432fd425b9a4001b6eb1f7",
      },
    ],
    total: 15561,
    totalToday: 41,
  },
  orders: {
    success: true,
    order,
    name: order.name,
  },
  login: {
    success: true,
    accessToken: tokens.access,
    refreshToken: tokens.refresh,
    user,
  },
  logout: {
    success: true,
    message: "Successful logout",
  },
  user: {
    success: true,
    user,
  },
  error: {
    success: false,
    message: 'Error',
  },
};
