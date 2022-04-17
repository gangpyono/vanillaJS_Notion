//event
import { updateEvent } from "../events/documentEvent.js";

export default function Editor({ $target }) {
  const $editContainer = document.createElement("div");
  $target.appendChild($editContainer);

  let state = {
    init: false,
    documentDetail: {},
  };

  const setState = (nextState) => {
    state = nextState;
    render();
  };

  let timerID = null;

  $editContainer.addEventListener("keyup", () => {
    if (timerID !== null) {
      clearTimeout(timerID);
    }

    timerID = setTimeout(() => {
      const $titleInput = document.querySelector(".titleInput");
      const $contentInput = document.querySelector(".contentInput");

      const updatedDocument = {
        id: state.documentDetail.id,
        title: $titleInput.value,
        content: $contentInput.value,
      };

      updateEvent($target, updatedDocument);
    }, 1000);
  });

  const render = () => {
    if (!state.init) {
      $editContainer.innerHTML = `
    <input class = "titleInput" value="${state.documentDetail.title}" autofocus/>
    <textarea class = "contentInput">${state.documentDetail.content}</textarea>
    `;

      state.init = true;
    }
  };

  // 렌더링 조건이 state가 변경되었을때 발생하기.
  // init
  $target.addEventListener("editor", (e) => {
    const { documentDetail, isEditing } = e.detail;

    // 루트경로검사
    if (documentDetail === null) {
      $editContainer.innerHTML = "";
      return;
    }

    if (isEditing) {
      setState({ ...state, init: true, documentDetail });
      return;
    }

    setState({ ...state, init: false, documentDetail });
    return;
  });
}
