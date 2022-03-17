import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as Icon from "react-icons/all";

import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Primary",
  leftIcon: <Icon.MdFileDownload />,
};
