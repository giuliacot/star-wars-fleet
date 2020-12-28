import '@testing-library/jest-dom';
import { queryCache } from 'react-query';
import fetch from 'jest-fetch-mock';

require('jest-fetch-mock').enableMocks();

beforeEach(() => {
  jest.clearAllMocks();
  fetch.resetMocks();
  queryCache.clear();
});
