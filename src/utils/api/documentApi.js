import { request } from "./index.js";

export const getDocumentAPI = async () => {
  const res = await request("/documents");

  return res;
};

export const addDocumentAPI = async (title, parent) => {
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

export const updateDocumentAPI = async (documentId, { title, content }) => {
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

export const deleteDocumentAPI = async (documentId) => {
  const res = await request(`/documents/${documentId}`, {
    method: "DELETE",
  });
  return;
};

export const documentDetailAPI = async (id) => {
  try {
    const res = await request(`/documents/${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
};
