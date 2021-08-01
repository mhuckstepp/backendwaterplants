export interface BaseUser {
  user_email: string;
  user_password: string;
  location?: string;
}

export interface User extends BaseUser {
  user_id: number;
  created_at: number;
  updated_at: number;
}

export interface TokenUser {
  subject: number;
  email: string;
  iat: number;
  exp: number;
}

export interface FrontEndUser {
  email: string;
  password: string;
  city?: string;
}
