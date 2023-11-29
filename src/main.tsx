import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "uno.css";
import { PagesProvider } from "./contexts/PageContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PagesProvider>
      <App />
    </PagesProvider>
  </React.StrictMode>
);
