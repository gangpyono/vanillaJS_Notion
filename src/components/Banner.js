//component
import RootAddBtn from "./RootAddBtn.js";

//event
import { selectEvent, addEvent, deleteEvent } from "../events/documentEvent.js";

//module
import { createDocument } from "../module/documentModule.js";

//storage
import {
  getToggleStateAtSessionStorage,
  addToggleStateAtSessionStorage,
  deleteToggleStateAtSessionStorage,
} from "../utils/storage/sessionStorage.js";

export default function Banner({ $target }) {
  const $container = document.createElement("div");
  $container.setAttribute("class", "bannerContainer");

  const $resizerBar = document.createElement("div");
  $resizerBar.setAttribute("class", "resizerBar");

  const $ul = document.createElement("ul");
  $ul.setAttribute("class", "bannerList");

  $container.appendChild($ul);
  $container.appendChild($resizerBar);
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
      selectEvent($target, id);
      return;
    }

    if (target.classList.contains("addBtn")) {
      addToggleStateAtSessionStorage("toggleList", id);
      addEvent($target, id);
      return;
    }

    if (target.classList.contains("deleteBtn")) {
      deleteToggleStateAtSessionStorage("toggleList", id);
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
        deleteToggleStateAtSessionStorage("toggleList", id);
        $ul.classList.remove("active");

        $toggleBtn.innerText = "▶";
        return;
      }

      addToggleStateAtSessionStorage("toggleList", id);
      $ul.classList.add("active");
      $toggleBtn.innerText = "▼";
      return;
    }

    return;
  });

  $container.addEventListener("resize", (e) => {});

  // resizer
  const resizeWith = (e) => {
    $container.style.width = e.pageX + "px";
  };

  $resizerBar.addEventListener("mousedown", () => {
    window.addEventListener("mousemove", resizeWith);
  });

  $resizerBar.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", resizeWith);
  });

  const render = () => {
    const toggleList = getToggleStateAtSessionStorage("toggleList");

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
