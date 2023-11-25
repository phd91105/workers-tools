/**
 * Helper function to handle API requests and error logging.
 */
export async function requestApi<T>(
  input: RequestInfo,
  init?: RequestInit<CfProperties>,
): Promise<T> {
  try {
    const response = await fetch(input, init);

    return await response.json();
  } catch (error) {
    console.error('Unexpected error:', error);

    throw error;
  }
}

/**
 * Constructs a URL with query parameters.
 */
export const constructURLWithParams = (
  baseUrl: string,
  params: { [key: string]: string | number },
) => {
  const url = new URL(baseUrl);
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      url.searchParams.set(key, String(params[key]));
    }
  });
  return url.toString();
};
