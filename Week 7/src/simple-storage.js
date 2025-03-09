export const setStorage = (key, data) => {
  const dataAsString = JSON.stringify(data);
  const encodedData = btoa(dataAsString);
  localStorage.setItem(key, encodedData);
};

export const getStorage = (key) => {
  const encodedData = localStorage.getItem(key);
  if (!encodedData) {
    return null;
  }
  const decodedData = atob(encodedData);
  return JSON.parse(decodedData);
};

export const clearStorage = (key) => {
  localStorage.removeItem(key);
};

export const storageHasData = () => localStorage.length > 0;
