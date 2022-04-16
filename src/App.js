//component
import Banner from "./components/Banner.js";
import Editor from "./components/Editor.js";

//api
import {
  getDocumentDB,
  documentDetailDB,
  addDocumentDB,
  deleteDocumentDB,
} from "./utils/api/documentApi.js";

//module
import { addDocument, deleteDocument } from "./module/documentModule.js";

export default function App({ $target }) {
  let state = {
    documentList: [],
    documentDetail: {},
  };

  const route = () => {
    const { pathname } = location;

    if (pathname.indexOf("/") > -1) {
      Banner({ $target, initialState: state.documentList });
    }

    if (pathname.indexOf("/documentDetail") > -1) {
      Editor({ $target, initialState: state.documentDetail });
    } else {
    }
  };

  window.addEventListener("popstate", () => route());

  const setState = (nextState) => {
    if (state !== nextState) {
      state = nextState;
      route();
    }
  };

  $target.addEventListener("add", async (e) => {
    const id = e.detail.id;

    const createdDocument = await addDocumentDB("untitle", id);
    const nextDocumentList = addDocument(state.documentList, id, createdDocument);

    setState({ ...state, documentList: nextDocumentList });
  });

  $target.addEventListener("delete", async (e) => {
    const id = e.detail.id;

    await deleteDocumentDB(id);
    const nextDocumentList = deleteDocument(state.documentList, id);
    setState({ ...state, documentList: nextDocumentList });
  });

  $target.addEventListener("selected", async (e) => {
    const id = e.detail.id;

    const nextDocumentDetail = await documentDetailDB(id);
    setState({ ...state, documentDetail: nextDocumentDetail });
  });

  const init = async () => {
    const nextDocumentList = await getDocumentDB();
    setState({ ...state, documentList: nextDocumentList });
  };

  init();
}
