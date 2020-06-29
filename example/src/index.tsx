import React from "react";
import ReactDOM from "react-dom";
import { Dropdown } from "react-uicomp";

const App = () => {
  return (
    <div style={{ paddingTop: 100 }}>
      <Dropdown
        menuStyles={{
          top: "100%",
        }}
        element={() => <span>Menu</span>}
      >
        <div>Dropdown Element</div>
      </Dropdown>

      <div style={{ paddingLeft: 200 }}>
        <Dropdown
          element={({ toggle }) => <span onClick={toggle}>Menu 2</span>}
          isAnimated={false}
          menuStyles={{
            background: "red",
            top: "100%",
          }}
        >
          <div>Dropdown Element 2</div>
        </Dropdown>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
