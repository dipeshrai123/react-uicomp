import React from "react";
import ReactDOM from "react-dom";
import { Dropdown, useDropdown } from "react-uicomp";

const App = () => {
  const ref = React.useRef(null);
  const { dropdownHandlers, toggle } = useDropdown(ref);

  return (
    <div>
      <Dropdown
        {...dropdownHandlers}
        ref={ref}
        render={() => <div onClick={toggle}>Dipesh</div>}
      >
        <div>Dropdown Division</div>
      </Dropdown>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
