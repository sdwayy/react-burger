import moment from "moment";
import { TCookieProps, TIngredient } from "../utils/types";

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string) => {
  setCookie(name, undefined, { expires: -1, path: '/' });
};

export const setCookie = (
  name: string,
  value: string = '',
  props?: TCookieProps,
) => {
  props = props || {};

  let exp = props.expires;

  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp instanceof Date) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;

  props.path = '/';

  for (const propName in props) {
    updatedCookie += `;${propName}`;
    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }

  document.cookie = updatedCookie;
};

export const formatDate = (date: string | Date) => {
  const orderTime = moment(date).calendar(null, {
    sameDay: '[Сегодня], LT',
    lastDay: '[Вчера], LT',
    lastWeek: '[На прошлой неделе], LT',
    sameElse: 'DD/MM/YYYY, LT'
  });
  const utcOffset = moment().utcOffset() / 60;
  const timezone = `i-GMT${utcOffset > 0 ? `+${utcOffset}` : utcOffset}`;

  return `${orderTime} ${timezone}`;
};

export const calculateBurgerPrice = (ingredients: TIngredient[]) => {
  return ingredients.reduce((acc, { price, type }) =>  {
    if (type === 'bun') return acc += price * 2;
    return acc += price;
  }, 0);
};
