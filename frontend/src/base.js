const PROD_BACKEND = 'https://faizgpt.onrender.com'; // <- fill this after backend URL
export const BASE =
  (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:8080'
    : PROD_BACKEND;
