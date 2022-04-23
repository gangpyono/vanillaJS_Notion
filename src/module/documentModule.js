import { sessionRemoveItem } from "../utils/storage/sessionStorage.js";

export const createDocument = ({ id, title, documents }, toggleList = {}) => {
  return `
      <li data-id = ${id} class = "bannerItem">
        <div class = "itemInner">
          <div class = "itemInner_left">
            <button class = "btn toggleBtn">${toggleList[id] ? "▼" : "▶"}</button>
            <span class = "itemTitle">${title === "" ? "untitle" : title}</span>
          </div>  
          <div class = "btnGroup">
            <button class = "btn deleteBtn">−</button>
            <button class = "btn addBtn">+</button>
          </div>
        </div>
        ${
          documents.length > 0
            ? `<ul class ="banner ${toggleList[id] ? "active" : ""}">
            ${documents.map((document) => createDocument(document, toggleList)).join("")}</ul>`
            : ""
        }
      </li>`;
};

export const addDocument = (initialState, targetId = "", createdDocument) => {
  const nextState = JSON.parse(JSON.stringify(initialState));

  if (targetId === null) {
    nextState.push(createdDocument);
    return nextState;
  }

  const recur = (parentDocument) => {
    if (parentDocument.length === 0) {
      return;
    } else {
      for (const childDocument of parentDocument) {
        if (childDocument.id === +targetId) {
          childDocument.documents.push(createdDocument);

          return;
        }
        recur(childDocument.documents);
      }
    }
  };
  recur(nextState);

  return nextState;
};

export const deleteDocument = (initialState, targetId) => {
  const nextState = JSON.parse(JSON.stringify(initialState));

  const recur = (parrentDocument, parrent = null) => {
    if (parrentDocument.length === 0) {
      return;
    } else {
      for (const childDocument of parrentDocument) {
        if (childDocument.id === +targetId) {
          const temp = JSON.parse(JSON.stringify(childDocument.documents));
          const idx = parrentDocument.findIndex((document) => document.id === +targetId);
          parrentDocument.splice(idx, 1);

          if (parrentDocument.length === 0 && parrent) sessionRemoveItem("toggleList", parrent.id);
          nextState.push(...temp);
          return;
        }

        recur(childDocument.documents, childDocument);
      }
    }
  };

  recur(nextState);

  return nextState;
};

export const updateDocument = (initialState, { id, title, content }) => {
  const nextState = JSON.parse(JSON.stringify(initialState));

  const recur = (parentDocument) => {
    if (parentDocument.length === 0) {
      return;
    } else {
      for (const childDocument of parentDocument) {
        if (childDocument.id === +id) {
          childDocument.title = title;
          childDocument.content = content;
          return;
        }

        recur(childDocument.documents);
      }
    }
  };

  recur(nextState);

  return nextState;
};
