type TSendResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};

export default TSendResponse;
