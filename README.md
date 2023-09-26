# JS Concurrency exercise

Given an array of URLs and a MAX_CONCURRENCY integer, implement a function that will asynchronously
fetch each URL, not requesting more than MAX_CONCURRENCY URLs at the same time. The URLs should
be fetched as soon as possible. The function should return an array of responses for each URL.

How would you write a test for such a function?

## 1. The function `fetchURLsWithMaxConcurrency(urls, MAX_CONCURRENCY)`
This function is designed to fetch multiple URLs concurrently while respecting a maximum concurrency limit. It can be particularly useful when you need to make multiple HTTP requests but want to control how many requests are sent at the same time to avoid overwhelming the server or your application.

### Parameters

- `urls` (Array of Strings): An array containing the URLs that you want to fetch.
- `MAX_CONCURRENCY` (Number): The maximum number of concurrent requests to make.

### How it Works

1. The function initializes an empty array called `responses` to store the responses from the fetched URLs.

2. Inside the function, there's an inner function called `fetchNextURL`. This function is responsible for fetching a single URL and pushing its response to the `responses` array.

3. The function starts multiple asynchronous fetch operations simultaneously. It does this by iterating up to the `MAX_CONCURRENCY` or the number of remaining URLs (whichever is smaller) and pushing the `fetchNextURL` function into an array called `fetchPromises`.

4. Each call to `fetchNextURL` fetches a URL and pushes its response to the `responses` array. This process continues until all URLs have been fetched.

5. The function waits for all fetch operations to complete using `Promise.all`. This ensures that it doesn't return until all URLs have been fetched.

### Return Value

- `responses` (Array of Responses): An array containing the responses from the fetched URLs. The order of responses corresponds to the order of the input URLs.

### Example Usage

```javascript
const fetchURLsWithMaxConcurrency = require('./fetchURLsWithMaxConcurrency');

const MAX_CONCURRENCY = 2;

const urls = [
  'https://example.com/1',
  'https://example.com/2',
  'https://example.com/3',
];

(async () => {
  const responses = await fetchURLsWithMaxConcurrency(urls, MAX_CONCURRENCY);
  console.log(responses);
})();
```

In the example above, the `fetchURLsWithMaxConcurrency` function is used to fetch URLs with a maximum concurrency of 2. The responses from the URLs are then logged to the console.

---


## 2. The test
I used Jest (https://jestjs.io/) in order to test the function, obtaining a 100% of coverage. 

In the test case I wrote: 

-We mock the fetch function to simulate successful HTTP requests with a status of 200.

-We describe a specific scenario: calling fetchURLsWithMaxConcurrency with an array of 5 URLs and a maximum concurrency limit of 3.

-The test checks two main assertions:

It verifies that the responses array returned by the function has a length of 5, indicating that all 5 URLs were successfully fetched.

It ensures that the fetch function was called exactly 5 times, confirming that each URL was fetched respecting the concurrency limit.
