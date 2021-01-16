import * as React from "react";
import { Dropdown, Menu, Collapse, CollapseComp } from "react-uicomp";

export default function Homepage() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
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

      <div style={{ display: "flex", flexDirection: "column" }}>
        <CollapseComp.Title
          onClick={() => setOpen((prev) => !prev)}
          expand={open}
          style={{ width: 100 }}
        >
          Title
        </CollapseComp.Title>

        <Collapse expand={open}>
          <CollapseComp.Body>Body</CollapseComp.Body>
        </Collapse>
      </div>
    </div>
  );
}
