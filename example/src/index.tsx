import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import HomePage from "./HomePage";
import DiffHeader from "./components/DiffHeaderPage";
import DropdownPage from "./components/DropdownPage";
import CollapsiblePage from "./components/CollapsiblePage";
import RippleButtonPage from "./components/RippleButtonPage";
import ModalPage from "./components/ModalPage";

import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/modal" component={ModalPage} />
        <Route path="/ripple-button" component={RippleButtonPage} />
        <Route path="/collapsible" component={CollapsiblePage} />
        <Route path="/dropdown" component={DropdownPage} />
        <Route path="/diff-header" component={DiffHeader} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
