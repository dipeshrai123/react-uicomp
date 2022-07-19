import { ComponentMeta } from '@storybook/react';

import { Toast, ToastContainer, useToast } from './toast.component';

const ToastComponent = () => {
  const { handler, toast } = useToast();
  return (
    <>
      <button
        onClick={() => {
          toast.success('Success Message!');
        }}
      >
        Open Toast
      </button>
      <ToastContainer>
        <Toast {...handler} />
      </ToastContainer>
    </>
  );
};

export default {
  title: 'Toast',
  component: ToastComponent,
} as ComponentMeta<typeof ToastComponent>;

const Template = () => <ToastComponent />;

export const Success = Template.bind({});
