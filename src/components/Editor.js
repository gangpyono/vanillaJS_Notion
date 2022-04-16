//event
import { updateEvent } from "../events/documentEvent.js";

export default function Editor({ $target, initialState: { id, title, content } }) {
  const $editContainer = document.createElement("div");
  console.log(1);
  $target.appendChild($editContainer);

  const render = () => {
    console.log(1);
    $editContainer.innerHTML = `
    <input class = "titleInput" value="${title}" autofocus />
    <textarea class = "contentInput">${content}</textarea>
    `;

    const $titleInput = document.querySelector(".titleInput");
    const $contentInput = document.querySelector(".contentInput");

    $editContainer.addEventListener("keyup", () => {
      const document = {
        id: id,
        title: $titleInput.value,
        content: $contentInput.value,
      };

      updateEvent($target, document);
    });
  };

  render();
}
