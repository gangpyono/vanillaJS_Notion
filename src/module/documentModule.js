export const addDocument = (initialState, targetId, createdDocument) => {
  const nextState = JSON.parse(JSON.stringify(initialState));

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

  const recur = (parrentDocument) => {
    if (parrentDocument.length === 0) {
      return;
    } else {
      for (const childDocument of parrentDocument) {
        if (childDocument.id === +targetId) {
          const temp = JSON.parse(JSON.stringify(childDocument.documents));
          const idx = parrentDocument.findIndex((document) => document.id === +targetId);
          parrentDocument.splice(idx, 1);
          nextState.push(...temp);
          return;
        }

        recur(childDocument.documents);
      }
    }
  };

  recur(nextState);

  return nextState;
};
