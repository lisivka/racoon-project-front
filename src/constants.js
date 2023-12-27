// Base URL for interacting with the backend
export const BASE_URL = process.env.BACKEND_APP_URL
export const BASE_WS_URL = process.env.BACKEND_WEBSOCKET_APP_URL

// Application routes
export const ROUTER_DATA = [
  {path: '', pathToComponent: 'pages/HomePage'},
  {path: 'registration', pathToComponent: 'pages/UserRegistrationPage'},
  {path: 'authorization', pathToComponent: 'pages/UserAuthorizationPage'},
  {path: 'users', pathToComponent: 'pages/UserListPage'},
  {path: 'users/:id', pathToComponent: 'pages/UserProfilePage'},
  {path: 'lots', pathToComponent: 'pages/LotListPage'},
  {path: 'lots/:id', pathToComponent: 'pages/LotDetailPage'},
  {path: 'auctions', pathToComponent: 'pages/AuctionListPage'},
  {path: 'auctions/:id', pathToComponent: 'pages/AuctionDetailPage'},
  {path: 'about', pathToComponent: 'pages/AboutPage'},
  {path: '/:catchAll(.*)', pathToComponent: 'pages/NotFoundPage'},
];
