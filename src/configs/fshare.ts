import { ENV } from "../../LoadEnv";

export const fshareAccount = {
  user_email: ENV.EMAIL,
  password: ENV.PASSWORD,
  app_key: ENV.APP_KEY,
};

export const fshareApiUrl = {
  login: "user/login",
  refreshToken: "user/refreshToken",
  download: "session/download",
  getFolder: "files/folder",
};

export const baseURL = "https://api.fshare.vn/api/";
export const getFolderURL = "https://www.fshare.vn/api/v3/";
export const searchFilmURL = "https://thuvienhd.com/";

export const commonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "user-agent": ENV.USER_AGENT,
};
