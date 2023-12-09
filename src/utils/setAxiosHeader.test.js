import { setAxiosHeader } from './setAxiosHeader';
import axios from 'axios';

describe('setAxiosHeader', () => {
  it('should set axios header', () => {
    setAxiosHeader();
    expect(axios.defaults.headers.common['content-type']).toBe(
      'application/json',
    );
  });
});
