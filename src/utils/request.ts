/**
 * Helper function to handle API requests and error logging.
 */
export async function handleApiRequest<T>(
  request: Promise<Response>,
): Promise<T> {
  try {
    const response = await request;

    return await response.json();
  } catch (error) {
    console.error('Unexpected error:', error);

    throw error;
  }
}
