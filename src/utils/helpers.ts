export const passwordExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

export const getFromStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setToStorage = (data: any, key: string) => {
  localStorage.setItem(key, data);
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
