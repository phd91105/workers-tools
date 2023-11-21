import axios from 'axios';

import { googleCustomSearch } from '@/contants';

/**
 * Perform a custom search using the Google Custom Search API.
 */
export async function customSearch(keyword: string, start?: number) {
  try {
    const { data } = await axios.get(googleCustomSearch(keyword, start));

    return data.items ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
