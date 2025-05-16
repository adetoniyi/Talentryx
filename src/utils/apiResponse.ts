export const successResponse = (message: string, data: any = null) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string, error: any = null) => {
  return {
    success: false,
    message,
    error,
  };
};
