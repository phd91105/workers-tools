import { thuvienhdUrl } from '@/constants';
import { filmRepository } from '@/db/repo';
import type { Env, FilmResponse } from '@/factory/types';
import { removeDiacritics, requestApi } from '@/utils';

/**
 * Search for films based on a keyword.
 */
export async function search(keyword: string, env: Env, findDb = true) {
  const cleanKeyword = removeDiacritics(keyword);

  if (findDb) {
    // Attempt to find films in the database.
    const dbData = await filmRepository.findAll(cleanKeyword, env);
    if (dbData) return dbData;
  }

  // Fetch film data from an external source.
  const filmResponse = await requestApi<FilmResponse>(thuvienhdUrl(keyword));

  if (filmResponse.data) {
    await filmRepository.bulkCreate(filmResponse, cleanKeyword, env);
  }

  return filmResponse;
}
