import * as React from "react";
import { Collapse, Collapsible } from "react-uicomp";

const Wrapped = ({ title, body }: { title: string; body: any }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Collapsible>
      <Collapsible.Title
        onClick={() => setOpen((prev) => !prev)}
        expand={open}
        style={{ width: 100 }}
      >
        {title}
      </Collapsible.Title>

      <Collapse expand={open}>
        <Collapsible.Body>{body}</Collapsible.Body>
      </Collapse>
    </Collapsible>
  );
};

export default function CollapsiblePage() {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
      }}
    >
      <Wrapped
        title="Dipesh"
        body={<Wrapped title="New Dipesh" body="New String" />}
      />
    </div>
  );
}
