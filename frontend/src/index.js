import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.render(
  <Routes />,
  document.getElementById("root")
);
