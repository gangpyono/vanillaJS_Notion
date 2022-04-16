import { selectedEvent, addEvent, deleteEvent } from "../events/documentEvent.js";

export default function Banner({ $target, initialState }) {
  const onCreate = ({ id, title, documents }) => {
    return `
      <li data-id = ${id}>
      <span class = "title">${title}<span>
      <div>
        <button class = "addBtn">+</button>
        <button class = "deleteBtn">-</button>
      </div>
        ${
          documents.length > 0
            ? `<ul>${documents.map((document) => onCreate(document)).join("")}</ul>`
            : ""
        }
      </li>`;
  };

  const render = () => {
    $target.innerHTML = `<ul class = "itemList">${initialState
      .map((document) => {
        return onCreate(document);
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
