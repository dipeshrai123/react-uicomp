import React from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

      <Dropdown triggerElement={() => <button>Toggle Menu</button>}>
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 3</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 4</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger>
            Item 5
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownPage;
