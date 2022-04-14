import { addDocumentDB } from "../utils/api/document.js";

export default function DocumentList({ $target, initialState }) {
  const $documents = document.createElement("ul");
  $target.appendChild($documents);

  this.state = initialState || [];
  this.setState = (nextState) => {
    if (nextState === this.state || nextState === []) {
      return;
    }
    this.state = nextState;
    this.render();
  };

  const onAdd = async ($target) => {
    let $ul = null;
    $target.childNodes.forEach((node) => {
      if (node.nodeName === "UL") $ul = node;
    });

    const document = {
      title: "untitle",
      parent: $target.dataset.id,
    };

    let id = null;
    try {
      id = await addDocumentDB(document.title, document.parent);
    } catch (error) {}

    if (!$ul) {
      $ul = window.document.createElement("ul");
      $ul.innerHTML = `
      <li data-id = ${id}>
      ${document.title}
      <div>
        <button class = "addBtn">+</button>
        <button class = "deleteBtn">-</button>
      </div>      
      </li>`;
      $target.appendChild($ul);
    } else {
      const $li = window.document.createElement("li");
      $li.setAttribute("data-id", id);
      $li.innerHTML = `${document.title}
      <div>
        <button class = "addBtn">+</button>
        <button class = "deleteBtn">-</button>
      </div>
      `;
      $ul.appendChild($li);
    }

    const $addBtn = window.document.querySelector(`[data-id = "${id}"] > div > .addBtn`);
    $addBtn.addEventListener("click", (e) => {
      const $li = e.target.closest("li");
      onAdd($li);
    });
    const $deleteBtn = window.document.querySelector(`[data-id = "${id}"] > div > .deleteBtn`);
    $deleteBtn.addEventListener("click", (e) => {
      const $li = e.target.closest("li");
      onDelete($li);
    });
  };

  const onDelete = async ($target) => {
    await deleteDocumentDB($target.dataset.id);
    $target.remove();
  };

  const onCreate = ({ id, title, documents }) => {
    return `
      <li data-id = ${id}>
      ${title}
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

  this.render = () => {
    $documents.innerHTML = this.state
      .map((document) => {
        return onCreate(document);
      })
      .join("");

    const $addBtns = document.querySelectorAll(".addBtn");
    $addBtns.forEach((addBtn) => {
      addBtn.addEventListener("click", (e) => {
        const $li = e.target.closest("li");
        onAdd($li);
      });
    });

    const $deleteBtns = document.querySelectorAll(".deleteBtn");
    $deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        const $li = e.target.closest("li");
        onDelete($li);
      });
    });
  };

  this.render();
}
