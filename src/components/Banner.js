//event
import { selectedEvent, addEvent, deleteEvent } from "../events/documentEvent.js";

//module
import { createDocument } from "../module/documentModule.js";

export default function Banner({ $target, initialState }) {
  const render = () => {
    $target.innerHTML = `<ul class = "itemList">${initialState
      .map((document) => {
        return createDocument(document);
      })
      .join("")}</ul>`;

    const $ul = document.querySelector(".itemList");

    $ul.addEventListener("click", (e) => {
      const className = e.target.className;
      const $li = e.target.closest("li");
      const id = $li.dataset.id;

      if (className === "title") {
        history.pushState(null, null, `/documentDetail/${id}`);
        selectedEvent($target, id);
      }

      if (className === "addBtn") {
        addEvent($target, id);
      }

      if (className === "deleteBtn") {
        deleteEvent($target, id);
      }
    });
  };

  render();
}
