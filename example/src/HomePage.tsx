import React, { useState } from "react";
import { Modal } from "react-uicomp";

export default function Homepage() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Modal</button>
      <Modal visible={visible} onOutsideClick={() => setVisible(false)}>
        Modal Content Goes Here...
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button onClick={() => setVisible(false)}>Close Modal</button>
        </div>
      </Modal>
    </div>
  );
}
