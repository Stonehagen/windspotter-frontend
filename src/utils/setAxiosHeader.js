import axios from 'axios';

export const setAxiosHeader = () => {
  axios.defaults.headers.common['content-type'] = 'application/json';
};
