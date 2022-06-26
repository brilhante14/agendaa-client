import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextButton } from ".";

export default {
  title: "Text Button",
  component: TextButton,
} as ComponentMeta<typeof TextButton>;

const Template: ComponentStory<typeof TextButton> = (args) => (
  <TextButton {...args} />
);

export const SimpleButton = Template.bind({});
SimpleButton.args = {
  title: "Exemplo",
  onClick: () => alert("Botão clicado"),
};
