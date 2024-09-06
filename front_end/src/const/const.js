// Utility function to generate full URLs
const generateUrl = (path) => `http://localhost:3000/api/${path}`;

// Users URL
export const CREATE_USER = generateUrl("users");
export const LOGIN_WEB = generateUrl("users/web_login");

export const UPDATE_USER = (id) => generateUrl(`users/${id}`);
export const DELETE_USER = (id) => generateUrl(`users/${id}`);
export const FIND_USER = (id) => generateUrl(`users/${id}`);
export const RESET_PASSWORD_BY_ID = (id) =>
  generateUrl(`users/reset_password_id/${id}`);
export const RESET_PASSWORD_BY_EMAIL = (email) =>
  generateUrl(`users/reset_password_email/${email}`);

export const PIC_THUMB = (id) => generateUrl(`users/thumb/${id}`);
export const PIC_FULL = (id) => generateUrl(`users/full/${id}`);

export const SEND_RESET_LINK = generateUrl("users/send_reset_link");

// Messages URL
export const GET_MESSAGES = (page, limit, type) =>
  generateUrl(`messages?page=${page}&limit=${limit}&type=${type}`);
export const UPDATE_MESSAGE = (id) => generateUrl(`messages/${id}`);
export const READ = (id) => generateUrl(`messages/read/${id}`);
