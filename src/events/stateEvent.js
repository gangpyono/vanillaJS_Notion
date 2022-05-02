export const setStateEventAtBanner = ($target, documentList) => {
  const event = new CustomEvent("banner", {
    detail: { documentList },
  });

  $target.dispatchEvent(event);
};

export const setStateEventAtEditor = ({ $target, documentDetail, isEditing = false }) => {
  const event = new CustomEvent("editor", {
    detail: { documentDetail, isEditing },
  });

  $target.dispatchEvent(event);
};
