import { googleCustomSearch } from '../contants';

/**
 * Perform a custom search using the Google Custom Search API.
 */
export async function customSearch(keyword: string, start?: number) {
  const response = await fetch(googleCustomSearch(keyword, start));
  const { items }: { items: Array<Record<string, string>> } =
    await response.json();

  return items ?? [];
}
