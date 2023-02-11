import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense("ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkJjXn5Yc3RVQmhdVUE=");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
window.removeLoading();
