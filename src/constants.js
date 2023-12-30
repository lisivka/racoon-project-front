// Base URL for interacting with the backend
export const BASE_URL = process.env.BACKEND_APP_URL
export const BASE_WS_URL = process.env.BACKEND_WEBSOCKET_APP_URL

// Names for access and refresh tokens in local storage
export const NAME_ACCESS_TOKEN = 'accessToken';
export const NAME_REFRESH_TOKEN = 'refreshToken';

// Application routes
export const ROUTER_DATA = [
  {path: '', pathToComponent: 'pages/HomePage'},
  {path: 'registration', pathToComponent: 'pages/UserRegistrationPage', meta: {requiresAuth: false}},
  {path: 'authorization', pathToComponent: 'pages/UserAuthorizationPage', meta: {requiresAuth: false}},
  {
    path: 'auth/users/activate/:uid/:token',
    pathToComponent: 'pages/AccountConfirmActivation',
    meta: { requiresAuth: false }
  },
  {path: 'auth/users/reset/:property', pathToComponent: 'pages/ResetUserData', meta: {requiresAuth: false}},
  {
    path: 'auth/users/reset_confirm/:property/:uid/:token',
    pathToComponent: 'pages/ResetUserDataConfirm',
    meta: { requiresAuth: false }
  },
  {path: 'settings', pathToComponent: 'pages/UserProfileSettingsPage', meta: {requiresAuth: true}},
  {path: 'users', pathToComponent: 'pages/UserListPage', meta: { requiresAuth: true }},
  {path: 'users/:id', pathToComponent: 'pages/UserProfilePage', meta: { requiresAuth: true }},
  {path: 'lots', pathToComponent: 'pages/LotListPage', meta: { requiresAuth: false }},
  {path: 'lots/:id', pathToComponent: 'pages/LotDetailPage', meta: { requiresAuth: false }},
  {path: 'auctions', pathToComponent: 'pages/AuctionListPage', meta: { requiresAuth: true }},
  {path: 'auctions/:id', pathToComponent: 'pages/AuctionDetailPage', meta: { requiresAuth: true }},
  {path: 'about', pathToComponent: 'pages/AboutPage'},
  {path: '/:catchAll(.*)', pathToComponent: 'pages/NotFoundPage'},
];

// Navigation items in the header for authorized user
export const HEADER_NAVBAR_AUTHORIZED_USER = [
  { path: '/users', title: 'Users' },
  { path: '/auctions', title: 'Auctions' },
];

// Dropdown menu items in the header for authorized user
export const HEADER_DROPDOWN_MENU_AUTHORIZED_USER = [
  { path: '/settings', title: 'Settings' },
];

// Dropdown menu items in the header for non-authorized user
export const HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER = [
  { path: '/registration', title: 'Registration' },
  { path: '/authorization', title: 'Login' },
];

// User information fields
export const USER_INFO_FIELDS = [
  { name: 'name', label: 'Name' },
  { name: 'surname', label: 'Surname' },
  { name: 'email', label: 'Email' },
];

// User information fields for my profile
export const MY_USER_INFO_FIELDS = [
  { name: 'phone', label: 'Phone' },
  ...USER_INFO_FIELDS
];

// Registration form fields
export const FIELDS_FORM_REGISTRATION = {
  name: { model: 'name', label: 'Name', type: 'text' },
  surname: { model: 'surname', label: 'Surname', type: 'text' },
  email: { model: 'email', label: 'Email', type: 'email' },
  password: { model: 'password', label: 'Password', type: 'password' },
  confirm_password: { model: 'confirm_password', label: 'Confirm password', type: 'password' },
};

// Password change fields
export const CHANGE_PASSWORD_FIELDS = [
  { field: 'current_password',  label: 'currentPassword' },
  { field: 'new_password',  label: 'newPassword' },
  { field: 're_new_password',  label: 'confirmNewPassword' },
];

// Immutable fields in user settings
export const NON_CHANGEABLE_USER_SETTINGS_FIELDS = ['email'];

// Maximum file size in Mb
export const LIMIT_AVATAR_SIZE = 2;
const maxFileSize = LIMIT_AVATAR_SIZE * 1024 * 1024;

// Form field validation rules
export const VALIDATION_RULES = {
  id: [],
  email: [
    v => !!v || "E-mail is required",
    v => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v)
      || "E-mail must be valid",
  ],
  phone: [v => /^\+380[0-9]{9}$/.test(v) || 'Enter phone in format +380XXXXXXXXX'],
  name: [v => !!v || "Name is required"],
  surname: [],
  avatar: [
    v => !v
      || !v.length
      || v[0].size <= maxFileSize
      || `Avatar size should be less than ${LIMIT_AVATAR_SIZE} Mb`,
    v => !v
      || !v.length
      || /\.(png|jpeg|jpg|PNG|JPEG|JPG)$/.test(v[0].name)
      || 'Accepted file extensions: .png, .jpeg, .jpg',
  ],
  password: [v => !!v || "Password is required"],
  current_password: [v => !!v || "Passwords must match"],
  new_password: [v => !!v || "Passwords must match"],
};

