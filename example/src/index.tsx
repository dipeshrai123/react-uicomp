import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import HomePage from "./HomePage";
import DiffHeader from "./components/DiffHeaderPage";

import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/diff-header" component={DiffHeader} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
