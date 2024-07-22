const getLocalStorage = (key: string) => {
  if (typeof localStorage !== "undefined") {
    const ls = localStorage.getItem(key);
    return ls ? JSON.parse(ls) : null;
  }
  return null;
};

const setLocalStorage = (value: any, key?: string) => {
  localStorage.setItem(key ?? "user", JSON.stringify(value));
};

export { getLocalStorage, setLocalStorage };
