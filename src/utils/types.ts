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
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  key?: string,
};

export type TLocationState = {
  from: {
    pathname: string;
  },
};

export type TUserData = {
  [key: string]: string,
  email: string,
  password: string,
  name: string,
};
