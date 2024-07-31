const getSessionStorage = (key: string) => {
  if (typeof sessionStorage !== "undefined") {
    const ss = sessionStorage.getItem(key);
    return ss ? JSON.parse(ss) : null;
  }
  return null;
};

const setSessionStorage = (value: any, key?: string) => {
  sessionStorage.setItem(key ?? "user", JSON.stringify(value));
};

export { getSessionStorage, setSessionStorage };
