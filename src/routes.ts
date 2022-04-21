const HOST = 'https://norma.nomoreparties.space';
const PREFIX = 'api';

const getRoute = (...path: string[]) => [HOST, PREFIX, ...path].join('/');

const routes = {
  ingredients: getRoute('ingredients'),
  orders: getRoute('orders'),

  forgotPassword: getRoute('password-reset'),
  resetPassword: getRoute('password-reset', 'reset'),

  register: getRoute('auth', 'register'),
  login: getRoute('auth', 'login'),
  logout: getRoute('auth', 'logout'),
  token: getRoute('auth', 'token'),
  user: getRoute('auth', 'user'),
};

export default routes;
