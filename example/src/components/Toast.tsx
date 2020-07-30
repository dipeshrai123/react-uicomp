import React from "react";
import { loremIpsum } from "lorem-ipsum";
import { Toast, useToast } from "react-uicomp";

const ToastPage = () => {
  const { handler, toast } = useToast();

  return (
    <div>
      <button onClick={() => toast({ message: loremIpsum(), type: "success" })}>
        Open Toast
      </button>

      <Toast {...handler} style={{ paddingRight: 20 }} />
    </div>
  );
};

export default ToastPage;
