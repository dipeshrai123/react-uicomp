import * as React from "react";
import { Collapse, CollapseComp } from "react-uicomp";

export default function Homepage() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
      }}
    >
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
