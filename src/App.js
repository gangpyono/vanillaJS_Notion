//component
import Banner from "./components/Banner.js";
import Editor from "./components/Editor.js";

//api
import {
  getDocumentDB,
  documentDetailDB,
  addDocumentDB,
  deleteDocumentDB,
  updateDocumentDB,
} from "./utils/api/documentApi.js";

//module
import {
  addDocument,
  deleteDocument,
  updateDocument,
  toggleDocument,
} from "./module/documentModule.js";

//event
import { bannerEvent, editorEvent } from "./events/stateEvent.js";
import { selectedEvent } from "../src/events/documentEvent.js";

export default function App({ $target }) {
  Banner({ $target });

  Editor({ $target });

  let state = {
    documentList: [],
    documentDetail: {},
  };

  const setState = (nextState) => {
    if (state !== nextState) {
      state = nextState;
    }
  };

  window.addEventListener("popstate", () => {
    const { pathname } = location;

    if (pathname === "/") {
      editorEvent({ $target, documentDetail: null });
      return;
    }

    if (pathname.indexOf("/documentDetail") > -1) {
      const temp = pathname.split("/");
      const id = temp[temp.length - 1];
      if (document.querySelector(`li[data-id = "${id}"]`)) selectedEvent($target, id);
      return;
    }
  });

  $target.addEventListener("add", async (e) => {
    const id = e.detail.id;

    const createdDocument = await addDocumentDB("untitle", id);
    const nextDocumentList = addDocument(state.documentList, id, createdDocument);

    setState({ ...state, documentList: nextDocumentList });

    bannerEvent($target, state.documentList);
  });

  $target.addEventListener("delete", async (e) => {
    const id = e.detail.id;

    await deleteDocumentDB(id);
    const nextDocumentList = deleteDocument(state.documentList, id);

    setState({ ...state, documentList: nextDocumentList, documentDetail: {} });
    editorEvent({ $target, documentDetail: null });
    bannerEvent($target, state.documentList);
  });

  $target.addEventListener("update", async (e) => {
    const { id, title, content } = e.detail;

    const documentDetail = await updateDocumentDB(id, { title, content });
    const documentList = updateDocument(state.documentList, documentDetail);

    setState({ ...state, documentList, documentDetail });

    editorEvent({ $target, documentDetail: state.documentDetail, isEditing: true });
    bannerEvent($target, state.documentList);
  });

  $target.addEventListener("selected", async (e) => {
    const id = e.detail.id;

    const nextDocumentDetail = await documentDetailDB(id);

    setState({ ...state, documentDetail: nextDocumentDetail });

    editorEvent({ $target, documentDetail: state.documentDetail });
  });

  $target.addEventListener("toggle", async (e) => {
    const id = e.detail.id;

    const nextDocumentList = toggleDocument(state.documentList, id);

    setState({ ...state, documentList: nextDocumentList });

    bannerEvent($target, state.documentList);
  });

  const init = async () => {
    const nextDocumentList = await getDocumentDB();
    setState({ ...state, documentList: nextDocumentList });
    bannerEvent($target, state.documentList);
  };

  init();
}
