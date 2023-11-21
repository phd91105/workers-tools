import { thuvienhdUrl } from '@/contants';
import { filmRepository } from '@/db/repo';
import { Env, FilmResponse } from '@/factory/types';
import { handleApiRequest, removeDiacritics } from '@/utils';

/**
 * Search for films based on a keyword.
 */
export async function search(keyword: string, env: Env) {
  const cleanKeyword = removeDiacritics(keyword);

  // Attempt to find films in the database.
  const dbData = await filmRepository.findAll(cleanKeyword, env);
  if (dbData) return dbData;

  // Fetch film data from an external source.
  const filmResponse = await handleApiRequest<FilmResponse>(
    fetch(thuvienhdUrl(keyword)),
  );

  if (filmResponse) {
    await filmRepository.bulkCreate(filmResponse, cleanKeyword, env);
  }

  return filmResponse;
}
