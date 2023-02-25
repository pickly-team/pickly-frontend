import Button from "@/common-ui/Button";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "버튼",
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
};

export const Small = Template.bind({});
Small.args = {
  ...Default.args,
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
};