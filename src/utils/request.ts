import axios from 'axios';

/**
 * Helper function to handle API requests and error logging.
 */
export async function handleApiRequest<T>(request: Promise<{ data: T }>) {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error making API request:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}
