const getHeaders = (token: string, params?: any) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params ?? {},
  };
};

export { getHeaders };
