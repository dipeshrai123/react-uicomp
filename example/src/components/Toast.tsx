import React from "react";
import { Toast, useToast } from "react-uicomp";

const ToastPage = () => {
  const { handler, toast } = useToast();

  return (
    <div>
      <button onClick={() => toast({ message: "HEY", type: "success" })}>
        Open Toast
      </button>

      <Toast {...handler} />
    </div>
  );
};

export default ToastPage;
