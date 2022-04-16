export const selectedEvent = async ($target, id) => {
  const event = new CustomEvent("selected", {
    bubbles: true,
    detail: { id },
  });

  $target.dispatchEvent(event);
};

export const addEvent = async ($target, id) => {
  const event = new CustomEvent("add", {
    bubbles: true,
    detail: { id },
  });

  $target.dispatchEvent(event);
};

export const deleteEvent = async ($target, id) => {
  const event = new CustomEvent("delete", {
    bubbles: true,
    detail: { id },
  });

  $target.dispatchEvent(event);
};

export const updateEvent = async ($target, document) => {
  const event = new CustomEvent("update", {
    bubbles: true,
    detail: document,
  });

  $target.dispatchEvent(event);
};
