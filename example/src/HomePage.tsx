import * as React from "react";
import { Dropdown, Menu } from "react-uicomp";

export default function Homepage() {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Dropdown
        trigger={() => <button style={{ width: 200 }}>Toggle Menu</button>}
      >
        <Menu.Container>
          <Menu.Item onClick={() => false}>Item 1</Menu.Item>
          <Menu.Item onClick={() => false}>Item 2</Menu.Item>
          <Menu.Item onClick={() => false}>Item 3</Menu.Item>
          <Menu.Item onClick={() => false}>Item 4</Menu.Item>
          <Menu.Separator />
          <Menu.Item onClick={() => false} danger>
            Item 5
          </Menu.Item>
        </Menu.Container>
      </Dropdown>
    </div>
  );
}
