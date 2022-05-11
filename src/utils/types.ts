export type TCookieProps = {
  path?: string;
  domain?: string;
  expires?: number | string | Date;
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None';
  secure?: boolean;
  [property: string]: any;
};

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string;
};

export type TLocationState = {
  from: {
    pathname: string;
  },
};

export type TUserData = {
  [key: string]: string;
  email: string;
  password: string;
  name: string;
};

export type TApiResponse = {
  success: boolean;
  message?: string;
};

export type TOrder = {
  ingredients: TIngredient[];
  createdAt: string;
  name: string;
  number: number;
  owner: TUserData & {
    createdAt: string;
  };
  price: number;
  status: 'done' | 'pending' | 'created';
  updateAt: string;
  _id: string;
};

export type TOrderResponse = TApiResponse & {
  name: string;
  order: TOrder;
};

export type TFeedOrder = Omit<TOrder, 'owner' | 'price' | 'ingredients'> & {
  ingredients: string[];
};

export type TFeedData = {
  total: number;
  totalToday: number;
  orders: TFeedOrder[];
};

export type TSocketState<T> = {
  data: T;
  hasError: boolean;
  isConnected: boolean;
};
