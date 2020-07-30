import React from "react";
import { loremIpsum } from "lorem-ipsum";
import { Toast, useToast } from "react-uicomp";

const ToastPage = () => {
  const { handler, toast } = useToast();

  return (
    <div>
      <button onClick={() => toast(loremIpsum())}>Open Toast</button>

      <Toast {...handler} />
    </div>
  );
};

export default ToastPage;
