export type TokenPayload = {
  userId: string;
  login: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};
