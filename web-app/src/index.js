import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";

import { App } from "./components/App/App";
import { store } from "./store";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
