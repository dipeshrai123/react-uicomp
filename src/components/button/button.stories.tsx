import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, RippleButton } from './button.component';

export default {
  title: 'Buttons',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default Button',
  loading: true,
};

const RippleTemplate: ComponentStory<typeof RippleButton> = (args) => (
  <RippleButton {...args} />
);

export const Ripple = RippleTemplate.bind({});
Ripple.args = {
  title: 'Ripple Button',
};
