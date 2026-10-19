export type AuthState = {
  error?: string;
  notice?: string;
  values?: Record<string, string>;
};
export type Tokens = { access_token: string; refresh_token: string };
