import { googleCustomSearch } from '@/contants';
import { requestApi } from '@/utils';

/**
 * Perform a custom search using the Google Custom Search API.
 */
export async function customSearch(keyword: string, start?: number) {
  try {
    const data = await requestApi<{ [key: string]: string }>(
      googleCustomSearch(keyword, start),
    );

    return data.items ?? [];
  } catch (error) {
    return [];
  }
}
