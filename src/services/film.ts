import { thuvienhdUrl } from '../contants';
import { type Env, type FilmResponse } from '../interfaces';
import { filmRepository } from '../repositories';
import { removeDiacritics } from '../utils';

/**
 * Search for films based on a keyword.
 */
export async function search(keyword: string, env: Env) {
  const cleanKeyword = removeDiacritics(keyword);

  // Attempt to find films in the database.
  const dbData = await filmRepository.findAll(cleanKeyword, env);
  if (dbData) return dbData;

  // Fetch film data from an external source.
  const response = await fetch(thuvienhdUrl(keyword));
  const result: { data: FilmResponse } = await response.json();

  if (result.data) {
    await filmRepository.bulkCreate(result.data, cleanKeyword, env);
  }

  return result;
}
