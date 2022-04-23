const sessionStorage = window.sessionStorage;

export const sessionSetItem = (key, value) => {
  const storageValue = JSON.parse(sessionStorage.getItem(key)) || {};

  const newStorageValue = { ...storageValue, [value]: true };

  sessionStorage.setItem(key, JSON.stringify(newStorageValue));

  return;
};

export const sessionGetItem = (key) => {
  const storageValue = JSON.parse(sessionStorage.getItem(key)) || {};

  return storageValue;
};

export const sessionRemoveItem = (key, value) => {
  const storageValue = JSON.parse(sessionStorage.getItem(key));
  delete storageValue[value];

  const newStorageValue = { ...storageValue };
  sessionStorage.setItem(key, JSON.stringify(newStorageValue));

  return;
};
