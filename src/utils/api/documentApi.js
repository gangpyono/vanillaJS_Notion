import { request } from "./index.js";

export const getDocumentDB = async () => {
  const res = await request("/documents");

  return res;
};

export const addDocumentDB = async (title, parent) => {
  try {
    const res = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title,
        parent,
      }),
    });

    res.documents = [];
    return res;
  } catch (error) {
    alert(error);
  }
};

export const updateDocumentDB = async (documentId, { title, content }) => {
  try {
    const res = await request(`/documents/${documentId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocumentDB = async (documentId) => {
  const res = await request(`/documents/${documentId}`, {
    method: "DELETE",
  });
  return;
};

export const documentDetailDB = async (id) => {
  try {
    const res = await request(`/documents/${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
