export const TOKEN_KEY = 'accessToken';
export const SESSION_KEY = 'sessionId';
export const FS_ENV = 'FS_ENV';
export const fshareApiUrl = {
  login: 'user/login',
  refreshToken: 'user/refreshToken',
  download: 'session/download',
  getFolder: 'files/folder',
};
export const baseURL = 'https://api.fshare.vn/api/';
export const getFolderURL = 'https://www.fshare.vn/api/v3/';
export const searchFilmURL = 'https://thuvienhd.com';
export const commonHeaders = (ua?: string) => ({
  'content-type': 'application/json; charset=utf-8',
  'user-agent':
    ua ??
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
});
export const googleSearchUrl = (
  keyword: string,
  language = 'vi',
  start?: number,
) =>
  `https://www.google.com/search?hl=${language}&q=${keyword}${
    start !== undefined ? `&start=${start}` : ''
  }`;
export const fsLinkPattern =
  /https:\/\/www\.fshare\.vn\/(file|folder)\/[^\s&]+/;
export const S40UA = 'Mozilla/5.0 (MSIE 10.0; Windows NT 6.1; Trident/5.0)';
export const googleCustomSearch = (keyword: string, start?: number) =>
  `https://www.googleapis.com/customsearch/v1?key=AIzaSyCkHtU1CuscUnF-DWuf-IXaI-ZAPnBpDnk&cx=001519239593396809485:inf84rznb7w&q=${keyword}${
    start !== undefined ? `&start=${start}` : ''
  }`;
export const thuvienhdUrl = (keyword: string) =>
  `${searchFilmURL}?feed=timfsharejson&search=${keyword}`;
