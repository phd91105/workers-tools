export interface FshareAccount {
  user_email?: string;
  password?: string;
}

export interface FshareFile {
  url?: string;
  password?: string;
}

export interface FshareAuthResponse {
  token?: string;
  session_id?: string;
}

export interface FshareFileResponse {
  location: string;
}
