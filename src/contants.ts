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
export const searchFilmURL = 'https://thuvienhd.com/';

export const commonHeaders = (ua: string) => ({
  'content-type': 'application/json; charset=utf-8',
  'user-agent': ua,
});
