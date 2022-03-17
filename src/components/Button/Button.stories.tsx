import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as Icon from 'react-icons/all';

import { Button } from './Button';

export default {
  title: 'Buttons',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default Button',
  variant: 'default',
};
Default.storyName = 'Default Button';

export const Primary = Template.bind({});
Primary.args = {
  title: 'Primary Button',
  variant: 'primary',
};
Primary.storyName = 'Primary Button';

export const Success = Template.bind({});
Success.args = {
  title: 'Success Button',
  variant: 'success',
};
Success.storyName = 'Success Button';

export const Warning = Template.bind({});
Warning.args = {
  title: 'Warning Button',
  variant: 'warning',
};
Warning.storyName = 'Warning Button';

export const Danger = Template.bind({});
Danger.args = {
  title: 'Danger Button',
  variant: 'danger',
};
Danger.storyName = 'Danger Button';

export const Info = Template.bind({});
Info.args = {
  title: 'Info Button',
  variant: 'info',
};
Info.storyName = 'Info Button';

export const Ghost = Template.bind({});
Ghost.args = {
  title: 'Ghost Button',
  variant: 'ghost',
};
Ghost.storyName = 'Ghost Button';

export const IconButton = Template.bind({});
IconButton.args = {
  variant: 'warning',
  leftIcon: <Icon.MdDelete style={{ position: 'relative', top: 1 }} />,
};
IconButton.storyName = 'Button with icon only';

export const LeftIcon = Template.bind({});
LeftIcon.args = {
  title: 'Delete',
  variant: 'warning',
  leftIcon: <Icon.MdDelete style={{ position: 'relative', top: 1 }} />,
};
LeftIcon.storyName = 'Button with left icon';

export const RightIcon = Template.bind({});
RightIcon.args = {
  title: 'Add',
  variant: 'primary',
  rightIcon: <Icon.MdAddBox style={{ position: 'relative', top: 1 }} />,
};
RightIcon.storyName = 'Button with right icon';

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  title: 'Loading Button',
  variant: 'primary',
};
LoadingButton.storyName = 'Loading state of a button';
