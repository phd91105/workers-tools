import { Env, FilmResponse } from '@/factory/types';
import {
  buildInsertOrUpdateQuery,
  buildSelectQuery,
  removeDiacritics,
  removeQuote,
} from '@/utils';

/**
 * Find all films based on a cleaned keyword.
 */
export async function findAll(cleanKeyword: string, env: Env) {
  const { results: films } = await env.DB.prepare(
    buildSelectQuery({
      col: '*',
      table: 'film',
      where: 'search_text LIKE ?',
    }),
  )
    .bind(`%${cleanKeyword}%`)
    .all();

  // const oldKey = films.map(({ search_text }) =>
  //   String(search_text).split('__').pop(),
  // );

  // const needRefresh = oldKey.some(
  //   (value) => value!.length > cleanKeyword.length && cleanKeyword.length > 4,
  // );
  const needRefresh = false;

  if (needRefresh || films.length === 0) return null;

  const filmIds = films.map((item) => item.id);
  const { results: filmDetail } = await env.DB.prepare(
    buildSelectQuery({
      col: '*',
      distinct: true,
      table: 'film_detail',
      where: `film_id IN (${filmIds})`,
    }),
  ).all();

  const data = films.map((film) => {
    return {
      ...film,
      links: filmDetail.filter((item) => item.film_id === film.id),
    };
  });

  const result = { status: 'success', data };

  return result;
}

/**
 * Bulk create films and their details in the database.
 */
export async function bulkCreate(
  filmResponse: FilmResponse,
  cleanKeyword: string,
  env: Env,
) {
  const { values, detailValues } = processInsertValues(
    filmResponse,
    cleanKeyword,
  );

  await Promise.all([
    env.DB.exec(
      buildInsertOrUpdateQuery({
        table: 'film',
        cols: ['id', 'image', 'title', 'search_text'],
        values,
      }),
    ),
    env.DB.exec(
      buildInsertOrUpdateQuery({
        table: 'film_detail',
        cols: ['film_id', 'title', 'link'],
        values: detailValues,
      }),
    ),
  ]);
}

/**
 * Process insert values for bulk creation in the database.
 */
export const processInsertValues = (
  filmResponse: FilmResponse,
  cleanKeyword: string,
) => {
  const values = filmResponse
    .data!.map(
      ({ id, image, title }) =>
        `('${id}', '${image}', '${removeQuote(title)}', '${removeDiacritics(
          title,
        )}__${cleanKeyword}')`,
    )
    .join(',');
  const filmDetails = filmResponse
    .data!.map(({ links, id }) =>
      links.map(({ title, link }) => ({ title, link, film_id: id })),
    )
    .flat();
  const detailValues = filmDetails
    .map(
      ({ film_id, link, title }) =>
        `(${film_id}, '${removeQuote(title)}', '${link}')`,
    )
    .join(',');

  return { values, detailValues };
};
