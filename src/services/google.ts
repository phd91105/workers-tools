import { googleCustomSearch } from '@/contants';
import { handleApiRequest } from '@/utils';

/**
 * Perform a custom search using the Google Custom Search API.
 */
export async function customSearch(keyword: string, start?: number) {
  try {
    const data = await handleApiRequest<{ [key: string]: string }>(
      fetch(googleCustomSearch(keyword, start)),
    );

    return data.items ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
