export type LoginResponse = {
  message: string;
  data: null | {
    accessToken: string;
    userSeq: number;
    userId: string;
  };
};
