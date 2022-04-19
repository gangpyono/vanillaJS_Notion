export const selectedEvent = async ($target, id) => {
  const event = new CustomEvent("selected", {
    detail: { id },
  });

  $target.dispatchEvent(event);
};

export const addEvent = async ($target, id) => {
  const event = new CustomEvent("add", {
    detail: { id },
  });

  $target.dispatchEvent(event);
};

export const deleteEvent = async ($target, id) => {
  const event = new CustomEvent("delete", {
    detail: { id },
  });

  $target.dispatchEvent(event);
};

export const updateEvent = async ($target, document) => {
  const event = new CustomEvent("update", {
    detail: document,
  });

  $target.dispatchEvent(event);
};

export const toggleEvent = async ($target, id) => {
  const event = new CustomEvent("toggle", {
    detail: { id },
  });

  $target.dispatchEvent(event);
};
