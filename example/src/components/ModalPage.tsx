import React, { useState } from "react";
import { Modal } from "react-uicomp";

const ModalPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>Open Modal</button>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        dismissOnOutsideClick={false}
      >
        Modal Content Goes Here...
        <div>
          <button onClick={() => setVisible(false)}>Close Modal</button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalPage;
