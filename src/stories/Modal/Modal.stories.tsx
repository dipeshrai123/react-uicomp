import { ComponentMeta } from "@storybook/react";

import { Modal as InternalModal } from "./Modal";

export default {
  title: "Modal",
  component: InternalModal,
} as ComponentMeta<typeof InternalModal>;

export const Modal = () => <InternalModal />;
