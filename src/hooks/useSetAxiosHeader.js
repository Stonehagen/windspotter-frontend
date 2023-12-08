import axios from 'axios';

export const useSetAxiosHeader = () => {
  axios.defaults.headers.common['content-type'] = 'application/json';
};
