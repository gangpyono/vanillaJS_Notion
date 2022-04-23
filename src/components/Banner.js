//component
import RootAddBtn from "./RootAddBtn.js";

//event
import { selectedEvent, addEvent, deleteEvent } from "../events/documentEvent.js";

//module
import { createDocument } from "../module/documentModule.js";

//storage
import {
  sessionGetItem,
  sessionSetItem,
  sessionRemoveItem,
} from "../utils/storage/sessionStorage.js";

export default function Banner({ $target }) {
  const $container = document.createElement("div");
  $container.setAttribute("class", "bannerContainer");

  const $ul = document.createElement("ul");
  $ul.setAttribute("class", "bannerList");

  $container.appendChild($ul);
  $target.appendChild($container);

  //root 추가버튼.
  RootAddBtn({ $target: $container, $eventTarget: $target });

  let state = {
    documentList: [],
  };

  const setState = (nextState) => {
    state = nextState;
    render();
  };

  $ul.addEventListener("click", (e) => {
    const target = e.target;
    const $li = target.closest("li");
    const id = $li.dataset.id;

    if (target.classList.contains("itemTitle")) {
      history.pushState(null, null, `/documentDetail/${id}`);
      selectedEvent($target, id);
      return;
    }

    if (target.classList.contains("addBtn")) {
      sessionSetItem("toggleList", id);
      addEvent($target, id);
      return;
    }

    if (target.classList.contains("deleteBtn")) {
      sessionRemoveItem("toggleList", id);
      history.replaceState(null, null, "/");
      deleteEvent($target, id);
      return;
    }

    if (target.classList.contains("toggleBtn")) {
      const $ul = document.querySelector(`li[data-id="${id}"] > ul`);
      const $toggleBtn = document.querySelector(
        `li[data-id="${id}"] > .itemInner > .itemInner_left > .toggleBtn`
      );

      if ($ul === null) return;

      if ($ul.classList.contains("active")) {
        sessionRemoveItem("toggleList", id);
        $ul.classList.remove("active");

        $toggleBtn.innerText = "▶";
        return;
      }

      sessionSetItem("toggleList", id);
      $ul.classList.add("active");
      $toggleBtn.innerText = "▼";
      return;
    }

    return;
  });

  const render = () => {
    const toggleList = sessionGetItem("toggleList");
    $ul.innerHTML = `${state.documentList
      .map((document) => {
        return createDocument(document, toggleList);
      })
      .join("")}`;
  };

  //init
  $target.addEventListener("banner", (e) => {
    const { documentList } = e.detail;
    setState({ ...state, documentList });
  });
}
