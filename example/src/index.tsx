import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import HomePage from "./components/HomePage/HomePage";
import DropdownPage from "./components/DropdownPage/DropdownPage";
import ScrollableBlockPage from "./components/ScrollableBlock/ScrollableBlock";
import AnimatedPage from "./components/AnimatedPage/Animated";
import ScrollPage from "./components/ScrollPage/Scroll";

import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dropdown" component={DropdownPage} />
        <Route path="/scrollable-block" component={ScrollableBlockPage} />
        <Route path="/animated" component={AnimatedPage} />
        <Route path="/scroll" component={ScrollPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
