//event
import { addEvent } from "../events/documentEvent.js";

export default function RootAddBtn({ $target, $eventTarget }) {
  const $button = document.createElement("button");

  $button.setAttribute("class", "rootAddBtn");
  $target.appendChild($button);

  const render = () => {
    $button.innerText = `+ Add a page`;
  };

  $button.addEventListener("click", () => {
    addEvent($eventTarget, null);
  });

  render();
}
