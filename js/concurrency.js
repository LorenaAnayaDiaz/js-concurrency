async function fetchURLsWithMaxConcurrency(urls, MAX_CONCURRENCY) {
  const responses = [];

  async function fetchNextURL() {
    const url = urls.pop();
    if (!url) {
      return;
    }

    const response = await fetch(url);
    responses.push(response);

    await fetchNextURL();
  }

  const fetchPromises = [];

  for (let i = 0; i < Math.min(MAX_CONCURRENCY, urls.length); i++) {
    fetchPromises.push(fetchNextURL());
  }

  await Promise.all(fetchPromises);
  return responses;
}

module.exports = fetchURLsWithMaxConcurrency;
