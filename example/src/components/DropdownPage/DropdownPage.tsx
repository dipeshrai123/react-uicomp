import React from "react";
import {
  Dropdown
} from "react-uicomp";
import "./DropdownPage.css";

const DropdownPage = () => {
  return (
    <div className="dropdownpage">
      <Dropdown
        triggerElement={() => <button>Toggle Menu</button>}
        options={[
          { title: "Item 1", onClick: () => false },
          { title: "Item 2", onClick: () => false },
          { title: "Item 3", onClick: () => false },
          { title: "Item 4", onClick: () => false },
          { type: "separator" },
          { title: "Item 5", onClick: () => false, danger: true },
        ]}
      />
    </div>
  );
};

export default DropdownPage;
