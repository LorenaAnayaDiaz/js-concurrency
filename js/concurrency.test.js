const fetchURLsWithMaxConcurrency = require('./concurrency.js');

global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));

describe('Given the function fetchURLsWithMaxConcurrency, when called with an array of 5 URLs and a max concurrency limit of 3', () => {
  const urls = [
    'https://example.com/1',
    'https://example.com/2',
    'https://example.com/3',
    'https://example.com/4',
    'https://example.com/5',
  ];

  test('then it fetches the array of 5 URLs respecting the concurrency limit of 3 and returning an array of responses of each URL', async () => {
    const MAX_CONCURRENCY = 3;

    const responses = await fetchURLsWithMaxConcurrency(urls, MAX_CONCURRENCY);

    expect(responses).toHaveLength(5);

    expect(fetch).toHaveBeenCalledTimes(5);
  });
});
