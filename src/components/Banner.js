//event
import { selectedEvent, addEvent, deleteEvent } from "../events/documentEvent.js";

//module
import { createDocument } from "../module/documentModule.js";

export default function Banner({ $target }) {
  const $ul = document.createElement("ul");
  $ul.setAttribute("class", "itemList");
  $target.appendChild($ul);

  let state = {
    documentList: [],
  };

  const setState = (nextState) => {
    state = nextState;
    render();
  };

  $ul.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const id = $li.dataset.id;

    const className = e.target.className;

    if (className === "title") {
      history.pushState(null, null, `/documentDetail/${id}`);
      selectedEvent($target, id);
      return;
    }

    if (className === "addBtn") {
      addEvent($target, id);
      return;
    }

    if (className === "deleteBtn") {
      deleteEvent($target, id);
      return;
    }
  });

  const render = () => {
    $ul.innerHTML = `${state.documentList
      .map((document) => {
        return createDocument(document);
      })
      .join("")}`;
  };

  //init
  $target.addEventListener("banner", (e) => {
    const { documentList } = e.detail;
    setState({ ...state, documentList });
  });
}
