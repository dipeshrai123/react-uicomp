import React from "react";
import { Toast, useToast } from "react-uicomp";

const ToastPage = () => {
  const { handler, toast } = useToast();

  return (
    <div>
      <button onClick={() => toast({ message: "HEY", type: "success" })}>
        Open Toast
      </button>

      <button
        onClick={() => toast({ message: "HEY ONCE AGAIN", type: "error" })}
      >
        Open Toast
      </button>

      <Toast {...handler} timeout={30000} />
    </div>
  );
};

export default ToastPage;
