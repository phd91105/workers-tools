import { constructURLWithParams } from './utils';

export const TOKEN_KEY = 'accessToken';
export const SESSION_KEY = 'sessionId';
export const FS_ENV = 'FS_ENV';

export const NEED_REFRESH = Symbol('NEED_REFRESH');
export const SUCCESS = Symbol('SUCCESS');

export const fshareApiUrl = {
  login: 'user/login',
  refreshToken: 'user/refreshToken',
  download: 'session/download',
  getFolder: 'files/folder',
};
export const baseURL = 'https://api.fshare.vn/api/';

export const getFolderURL = 'https://www.fshare.vn/api/v3/';

export const searchFilmURL = 'https://thuvienhd.com';

export const commonHeaders = (
  ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
) => ({
  'content-type': 'application/json; charset=utf-8',
  'user-agent': ua,
});

export const googleSearchUrl = (
  keyword: string,
  language = 'vi',
  start: string | number = '',
) =>
  constructURLWithParams('https://www.google.com/search', {
    hl: language,
    q: keyword,
    start,
  });

export const fsLinkPattern =
  /https:\/\/www\.fshare\.vn\/(file|folder)\/[^\s&]+/;

export const googleCustomSearch = (
  keyword: string,
  start: string | number = '',
) =>
  constructURLWithParams('https://www.googleapis.com/customsearch/v1', {
    key: 'AIzaSyCkHtU1CuscUnF-DWuf-IXaI-ZAPnBpDnk',
    cx: '001519239593396809485:inf84rznb7w',
    q: keyword,
    start,
  });

export const thuvienhdUrl = (keyword: string) =>
  constructURLWithParams(searchFilmURL, {
    feed: 'timfsharejson',
    search: encodeURIComponent(keyword),
  });

export const githubUrl = (owner: string, repo: string) =>
  `https://api.github.com/repos/${owner}/${repo}/commits`;
