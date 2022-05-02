//component
import Banner from "./components/Banner.js";
import Editor from "./components/Editor.js";

//api
import {
  getDocumentAPI,
  documentDetailAPI,
  addDocumentAPI,
  deleteDocumentAPI,
  updateDocumentAPI,
} from "./utils/api/documentApi.js";

//module
import { addDocument, deleteDocument, updateDocument } from "./module/documentModule.js";

//event
import { setStateEventAtBanner, setStateEventAtEditor } from "./events/stateEvent.js";
import { selectEvent } from "../src/events/documentEvent.js";

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

  const route = () => {
    const { pathname } = location;
    if (pathname.includes("/documentDetail")) {
      const [, , id] = pathname.split("/");
      selectEvent($target, id);
    }
  };

  window.addEventListener("popstate", () => {
    const { pathname } = location;

    if (pathname === "/") {
      setStateEventAtEditor({ $target, documentDetail: null });
      return;
    }

    if (pathname.includes("/documentDetail")) {
      const temp = pathname.split("/");
      const id = temp[temp.length - 1];
      if (document.querySelector(`li[data-id = "${id}"]`)) selectEvent($target, id);
      return;
    }
  });

  $target.addEventListener("add", async (e) => {
    const id = e.detail.id;

    const createdDocument = await addDocumentAPI("untitle", id);
    const nextDocumentList = addDocument(state.documentList, id, createdDocument);

    setState({ ...state, documentList: nextDocumentList });

    setStateEventAtBanner($target, state.documentList);
  });

  $target.addEventListener("delete", async (e) => {
    const id = e.detail.id;

    await deleteDocumentAPI(id);
    const nextDocumentList = deleteDocument(state.documentList, id);

    setState({ ...state, documentList: nextDocumentList, documentDetail: {} });
    setStateEventAtEditor({ $target, documentDetail: null });
    setStateEventAtBanner($target, state.documentList);
  });

  $target.addEventListener("update", async (e) => {
    const { id, title, content } = e.detail;

    const documentDetail = await updateDocumentAPI(id, { title, content });
    const documentList = updateDocument(state.documentList, documentDetail);

    setState({ ...state, documentList, documentDetail });

    setStateEventAtEditor({ $target, documentDetail: state.documentDetail, isEditing: true });
    setStateEventAtBanner($target, state.documentList);
  });

  $target.addEventListener("selected", async (e) => {
    const id = e.detail.id;

    const nextDocumentDetail = await documentDetailAPI(id);

    setState({ ...state, documentDetail: nextDocumentDetail });

    setStateEventAtEditor({ $target, documentDetail: state.documentDetail });
  });

  const init = async () => {
    const nextDocumentList = await getDocumentAPI();
    setState({ ...state, documentList: nextDocumentList });
    setStateEventAtBanner($target, state.documentList);
    route();
  };

  init();
}
