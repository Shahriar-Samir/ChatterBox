type TSendResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

export type TSendResponseWithCookie = {
  success: boolean;
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
};

export type TSendResponseWithRemovingCookie = {
  success: boolean;
  status: number;
  message: string;
};

export default TSendResponse;
