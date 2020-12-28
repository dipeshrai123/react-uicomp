import React from "react";
import { Dropdown, DropdownMenu } from "react-uicomp";
import "./DropdownPage.css";

const DropdownPage = () => {
  return (
    <div className="dropdownpage">
      <Dropdown triggerElement={() => <button>Toggle Menu</button>}>
        <DropdownMenu.Container>
          <DropdownMenu.Item onClick={() => false}>Item 1</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => false}>Item 2</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => false}>Item 3</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => false}>Item 4</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => false} danger>
            Item 5
          </DropdownMenu.Item>
        </DropdownMenu.Container>
      </Dropdown>
    </div>
  );
};

export default DropdownPage;
