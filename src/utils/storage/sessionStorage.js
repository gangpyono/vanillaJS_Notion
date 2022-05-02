const sessionStorage = (key) => {
  const sessionStorage = window.sessionStorage;

  return {
    get: () => JSON.parse(sessionStorage.getItem(key)),
    set: (value) => sessionStorage.setItem(key, JSON.stringify(value)),
  };
};

export const addtoggleStateAtSessionStorage = (key, id) => {
  const storage = sessionStorage(key);
  const storageValue = storage.get() || {};
  const newStorageValue = { ...storageValue, [id]: true };

  storage.set(newStorageValue);
  return;
};

export const deleteToggleStateAtSessionStorage = (key, id) => {
  const storage = sessionStorage(key);
  const storageValue = storage.get() || {};
  const newStorageValue = { ...storageValue };
  delete newStorageValue[id];

  storage.set(newStorageValue);
  return;
};

export const getToggleStateAtSessionStorage = (key) => {
  const storage = sessionStorage(key);
  const storageValue = storage.get() || {};

  return storageValue;
};
