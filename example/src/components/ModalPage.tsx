import * as React from "react";
import { Modal } from "react-uicomp";

export default function ModalPage() {
  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <button onClick={() => setVisible((prev) => !prev)}>TOGGLE</button>

      <div style={{ height: 2000 }} />
      <Modal
        visible={visible}
        onOutsideClick={() => setVisible(false)}
        disableScroll
      >
        CONTENT OF MODAL
      </Modal>
    </div>
  );
}
