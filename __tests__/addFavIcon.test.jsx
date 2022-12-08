/* eslint-disable sonarjs/no-duplicate-string */
import { jest } from '@jest/globals';
import AddFavIcon, { getFavIcon } from '../components/addFavIcon';

global.fetch = jest.fn((e) => {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        domain: 'google.com',
        favicon: '/favicon.ico'
      })
  });
});

describe('getFavIcon', () => {
  it('should return updated element with favicon url', async () => {
    const element = { id: 1, domain: 'google.com', favicon: null };
    const result = await getFavIcon(element);
    expect(result.favicon).toBe('/favicon.ico');
  });
});

describe('AddFavIcon', () => {
  it('should return with null if no data is provided', async () => {
    const result = await AddFavIcon([], jest.fn());
    expect(result).toBeNull();
  });

  it('should update elements in data state.', async () => {
    // Setting up input data to give the function
    const data = {
      data: [{ id: 1, domain: 'google.com', favicon: '' }]
    };

    // Expected data to be called into set data:
    const expectedData = {
      id: 1,
      domain: 'google.com',
      favicon: '/favicon.ico'
    };

    // Setting up Jest Mock
    const mockSetData = jest.fn();

    // Calling method with data and method
    await AddFavIcon(data, mockSetData);

    // Validating favicons was called one time.
    expect(await mockSetData).toHaveBeenCalledTimes(1);

    // Validating favicons were set and applied to the elements.
    expect(await mockSetData).toHaveBeenCalledWith(expectedData);
  });
});
