/* eslint-disable quote-props */

import axios from 'axios';
import { result } from 'lodash';

const API_REQUEST = (idToken) => {
  const token = result(window, '$app.$store.state.auth.idToken', false);

  if (token || idToken) {
    return axios.create({
      baseURL: `${process.env.API_DOMAIN}/`,
      headers: { 'Authentication': token || idToken },
    });
  }

  return axios.create({
    baseURL: `${process.env.API_DOMAIN}/`,
  });
};

export default API_REQUEST;
