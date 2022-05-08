const HOST = 'norma.nomoreparties.space';
const PREFIX = 'api';

type TRouteParams = {
  protocol?: 'https' | 'wss';
  path: string;
};

const getRoute = ({ path, protocol = 'https' }: TRouteParams) => {
  const parts = [HOST]
  if (protocol !== 'wss') parts.push(PREFIX)
  parts.push(path)

  return `${protocol}://${parts.join('/')}`
};

const routes = {
  ingredients: getRoute({ path: 'ingredients' }),

  orders: getRoute({ path: 'orders' }),
  userOrders: getRoute({ protocol: 'wss', path: 'orders' }),
  feed: getRoute({ protocol: 'wss', path: 'orders/all', }),

  forgotPassword: getRoute({ path: 'password-reset' }),
  resetPassword: getRoute({ path: 'password-reset/reset' }),

  register: getRoute({ path: 'auth/register' }),
  login: getRoute({ path: 'auth/login' }),
  logout: getRoute({ path: 'auth/logout' }),
  token: getRoute({ path: 'auth/token' }),
  user: getRoute({ path: 'auth/user' }),
};

export default routes;
